<template>
    <div class="document-preview">
      <div class="toolbar main-toolbar">
        <button @click="exportToWord" class="export-btn">
          <font-awesome-icon :icon="['fas', 'file-word']" /> Export
        </button>
        <button @click="print" class="print-btn">
          <font-awesome-icon :icon="['fas', 'print']" /> Print
        </button>
        <div class="zoom-controls">
          <button @click="zoomOut" :disabled="zoom <= 0.5">
            <font-awesome-icon :icon="['fas', 'minus']" />
          </button>
          <span>{{ Math.round(zoom * 100) }}%</span>
          <button @click="zoomIn" :disabled="zoom >= 2">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
        </div>
      </div>
      <div class="toolbar format-toolbar">
        <select v-model="fontFamily" @change="applyStyle('fontFamily')">
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
        <select v-model="fontSize" @change="applyStyle('fontSize')">
          <option v-for="size in [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72]" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <button @click="applyStyle('bold')" :class="{ active: isBold }">
          <font-awesome-icon :icon="['fas', 'bold']" />
        </button>
        <button @click="applyStyle('italic')" :class="{ active: isItalic }">
          <font-awesome-icon :icon="['fas', 'italic']" />
        </button>
        <button @click="applyStyle('underline')" :class="{ active: isUnderline }">
          <font-awesome-icon :icon="['fas', 'underline']" />
        </button>
        <input type="color" v-model="textColor" @change="applyStyle('color')" /><font-awesome-icon :icon="['fas', 'palette']" />
      </div>
      <div class="document-scroll-container">
        <div class="document-container" :style="{ transform: `scale(${zoom})` }">
          <div class="page">
            <div class="page-content" contenteditable="true" @input="updateContent" ref="content">
              {{ content }}
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span>Last Edited: {{ lastEdited }}</span>
      </div>
    </div>
  </template>

  <script>
  import { saveAs } from 'file-saver';
  import { Document, Packer, Paragraph, TextRun } from 'docx';

  export default {
    name: 'DocumentPreview',
    data() {
      return {
        content: 'This is a sample document content. Click to edit.',
        zoom: 1,
        lastEdited: new Date().toLocaleString(),
        fontFamily: 'Arial',
        fontSize: 16,
        textColor: '#000000',
        isBold: false,
        isItalic: false,
        isUnderline: false,
      };
    },
    methods: {
      updateContent(event) {
        this.content = event.target.innerText;
        this.lastEdited = new Date().toLocaleString();
      },
      exportToWord() {
        const doc = new Document({
          sections: [{
            properties: {},
            children: [
              new Paragraph({
                children: [new TextRun(this.content)],
              })
            ],
          }],
        });

        Packer.toBlob(doc).then(blob => {
          saveAs(blob, "document.docx");
        });
      },
      print() {
        window.print();
      },
      zoomIn() {
        if (this.zoom < 2) this.zoom += 0.1;
      },
      zoomOut() {
        if (this.zoom > 0.5) this.zoom -= 0.1;
      },
      applyStyle(style) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const span = document.createElement('span');

          switch(style) {
            case 'fontFamily':
              span.style.fontFamily = this.fontFamily;
              break;
            case 'fontSize':
              span.style.fontSize = `${this.fontSize}px`;
              break;
            case 'bold':
              this.isBold = !this.isBold;
              span.style.fontWeight = this.isBold ? 'bold' : 'normal';
              break;
            case 'italic':
              this.isItalic = !this.isItalic;
              span.style.fontStyle = this.isItalic ? 'italic' : 'normal';
              break;
            case 'underline':
              this.isUnderline = !this.isUnderline;
              span.style.textDecoration = this.isUnderline ? 'underline' : 'none';
              break;
            case 'color':
              span.style.color = this.textColor;
              break;
          }

          range.surroundContents(span);
        }
      },
    },
  };
  </script>

  <style scoped>
  .document-preview {
    font-family: 'Roboto', Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f8ff;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    z-index: 1000;
  }

  .main-toolbar {
    top: 80px;
  }

  .format-toolbar {
    top: 140px;
    padding: 10px;
    justify-content: flex-start;
    gap: 10px;
  }

  .toolbar button {
    padding: 10px 15px;
    border: none;
    border-radius: 6px;
    background-color: #1e90ff;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }

  .toolbar button:hover {
    background-color: #0000cd;
    transform: translateY(-2px);
  }

  .toolbar button:disabled {
    background-color: #87cefa;
    cursor: not-allowed;
  }

  .format-toolbar button {
    padding: 8px 12px;
    background-color: #f0f8ff;
    color: #1e90ff;
  }

  .format-toolbar button.active {
    background-color: #1e90ff;
    color: white;
  }

  .format-toolbar select, .format-toolbar input[type="color"] {
    padding: 6px;
    border: 1px solid #1e90ff;
    border-radius: 4px;
    background-color: white;
    color: #333;
  }

  .zoom-controls {
    display: flex;
    align-items: center;
    background-color: #e6f3ff;
    padding: 5px 10px;
    border-radius: 20px;
  }

  .zoom-controls button {
    background-color: transparent;
    color: #1e90ff;
    margin: 0 5px;
    padding: 5px 10px;
  }

  .zoom-controls button:hover {
    background-color: #1e90ff;
    color: white;
  }

  .document-scroll-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 20px 0;
  }

  .document-container {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    transform-origin: top center;
  }

  .page {
    min-height: 1000px;
    padding: 60px 40px 40px;
    background-color: white;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
    position: relative;
  }

  .page-content {
    outline: none;
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    font-size: 14px;
    color: #4682b4;
    padding: 10px 0;
  }

  @media print {
    .toolbar, .footer {
      display: none;
    }
    .document-container {
      transform: none !important;
      box-shadow: none;
    }
    .page {
      box-shadow: none;
    }
  }
  </style>
