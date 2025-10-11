const AVERAGE_WPM = 225;

function toPlainText(value?: string | null) {
  if (!value) return "";
  // very lightweight HTML strip; Strapi richtext is stored as HTML
  return value.replace(/<[^>]*>/g, " ");
}

function estimateReadTime(data: Record<string, any>) {
  if (!data) return;

  const source = toPlainText(data.content) || toPlainText(data.excerpt);
  const words = source.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    data.readTime = null;
    return;
  }

  const minutes = Math.max(1, Math.ceil(words.length / AVERAGE_WPM));
  data.readTime = `${minutes} min read`;
}

export default {
  beforeCreate(event: any) {
    if (event?.params?.data) {
      estimateReadTime(event.params.data);
    }
  },
  beforeUpdate(event: any) {
    if (event?.params?.data) {
      estimateReadTime(event.params.data);
    }
  },
};
