<template>
  <div class="markdown-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="toolbar">
      <button class="toolbar-button" @click="toggleTheme" title="Temayı Değiştir">
        <span v-if="isDarkMode"><font-awesome-icon :icon="['fas', 'sun']" /></span>
        <span v-else><font-awesome-icon :icon="['fas', 'moon']" /></span>
      </button>
      <button class="toolbar-button" @click="exportToPDF" title="PDF olarak kaydet">
        <font-awesome-icon :icon="['fas', 'file-pdf']" />
      </button>
    </div>
    <div class="content-wrapper">
      <div ref="markdownContent" class="markdown-content" v-html="compiledMarkdown"></div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import axios from 'axios';
import hljs from 'highlight.js';
import html2pdf from 'html2pdf.js';
import 'highlight.js/styles/github.css';

export default {
  name: 'DocumentPreview',
  data() {
    return {
      markdownContent: '',
      documentId: '',
      isDarkMode: false,
      md: null
    };
  },
  computed: {
    compiledMarkdown() {
      if (!this.md) return '';
      return this.md.render(this.markdownContent || '');
    }
  },
  async created() {
    await this.initializeMarkdown();
    this.documentId = this.$route.params.documentId;
    this.fetchAnalysis();
  },
  mounted() {
    this.checkPreferredTheme();
  },
  methods: {
    async initializeMarkdown() {
      this.md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(str, { language: lang }).value;
            } catch (error) {
              console.error('Highlight.js error:', error);
            }
          }
          return '';
        }
      });

      this.md.renderer.rules.list_item_open = function (tokens, idx) {
        const token = tokens[idx];
        if (token.markup === '-' || token.markup === '*') {
          return '<li class="bullet-item">';
        } else if (token.markup.match(/[0-9]+./)) {
          return '<li class="number-item">';
        }
        return '<li>';
      };
    },
    async fetchAnalysis() {
      try {
        const response = await axios.get(`http://localhost:3000/getAnalysis/${this.documentId}`);
        if (response.data.success) {
          this.markdownContent = response.data.result;
        }
      } catch (error) {
        console.error('Error fetching document:', error);
        this.markdownContent = '### Error loading document\nPlease try again later.';
      }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('markdown-theme', this.isDarkMode ? 'dark' : 'light');
    },
    checkPreferredTheme() {
      const savedTheme = localStorage.getItem('markdown-theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else {
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    },
    exportToPDF() {
      const content = this.$refs.markdownContent;
      const options = {
        margin: 10,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(options).from(content).save();
    }
  }
};
</script>


<style>
.markdown-container {
  --primary-color: #2563eb;
  --text-color: #1f2937;
  --bg-color: #ffffff;
  --border-color: #e5e7eb;
  --code-bg: #f3f4f6;
  --heading-color: #111827;
  --link-color: #2563eb;
  --table-header-bg: #f8fafc;
  --table-stripe-bg: #f1f5f9;

  max-width: 100%;
  margin: 0;
  padding: 2rem;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  transition: all 0.3s ease;
  position: relative;
}

.dark-mode {
  --primary-color: #60a5fa;
  --text-color: #e5e7eb;
  --bg-color: #1f2937;
  --border-color: #374151;
  --code-bg: #2d3748;
  --heading-color: #f9fafb;
  --link-color: #60a5fa;
  --table-header-bg: #374151;
  --table-stripe-bg: #1f2937;
}

.toolbar {
  position: sticky;
  top: 2rem;
  right: 0;
  z-index: 1000;
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: flex-end;
}

.toolbar-button {
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
}

.toolbar-button:hover {
  background-color: var(--border-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  max-width: 768px;
  margin: 0;  /* Margin'i 0'a ayarladık */
  padding: 0 1rem;  /* Sağ ve sol padding ekledik */
}

.markdown-content {
  line-height: 1.6;
  text-align: left;  /* İçeriği sola dayalı yaptık */
}

/* Başlık stilleri */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  color: var(--heading-color);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  text-align: left;  /* Başlıkları sola dayalı yaptık */
}

.markdown-content h1 { font-size: 2em; }
.markdown-content h2 { font-size: 1.5em; }
.markdown-content h3 { font-size: 1.25em; }
.markdown-content h4 { font-size: 1.1em; }
.markdown-content h5, .markdown-content h6 { font-size: 1em; }

/* Paragraf stilleri */
.markdown-content p {
  margin: 1em 0;
  text-align: left;  /* Paragrafları sola dayalı yaptık */
}

/* Tablo stilleri */
.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  border: 1px solid var(--border-color);
  text-align: left;  /* Tablo içeriğini sola dayalı yaptık */
}

.markdown-content th {
  background-color: var(--table-header-bg);
  font-weight: 600;
  text-align: left;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
}

.markdown-content td {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  text-align: left;  /* Tablo hücrelerini sola dayalı yaptık */
}

.markdown-content tr:nth-child(even) {
  background-color: var(--table-stripe-bg);
}

/* Liste stilleri */
.markdown-content ul,
.markdown-content ol {
  padding-left: 1.5em;
  margin: 1em 0;
  text-align: left;  /* Listeleri sola dayalı yaptık */
}

.markdown-content ul {
  list-style-type: none;
}

.markdown-content ol {
  list-style-type: decimal;
}

.markdown-content li {
  margin: 0.5em 0;
  position: relative;
  text-align: left;  /* Liste öğelerini sola dayalı yaptık */
}

.markdown-content .bullet-item::before {
  content: "•";
  color: var(--primary-color);
  position: absolute;
  left: -1.2em;
  font-weight: bold;
}

.markdown-content .number-item {
  padding-left: 0.5em;
}

/* İç içe listeler için özel stil */
.markdown-content ul ul,
.markdown-content ol ol,
.markdown-content ul ol,
.markdown-content ol ul {
  margin: 0.25em 0 0.25em 1.5em;
}

/* Kod bloğu stilleri */
.markdown-content pre {
  background-color: var(--code-bg);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1em 0;
  overflow-x: auto;
  text-align: left;  /* Kod bloklarını sola dayalı yaptık */
}

.markdown-content code {
  font-family: monospace;
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  background-color: var(--code-bg);
}

/* Bağlantı stilleri */
.markdown-content a {
  color: var(--link-color);
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

/* Responsive tasarım */
@media (max-width: 768px) {
  .markdown-container {
    padding: 1rem;
  }

  .markdown-content table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .markdown-content td,
  .markdown-content th {
    padding: 0.5rem;
  }

  .content-wrapper {
    padding: 0 0.5rem;  /* Mobil görünümde padding'i azalttık */
  }
}
</style>
