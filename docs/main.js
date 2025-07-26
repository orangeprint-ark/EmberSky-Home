function exec(command, value = null) {
  document.execCommand(command, false, value);
}

function clearEditor() {
  if (confirm("Clear everything?")) {
    document.getElementById('editor').innerHTML = '';
  }
}

function insertImage() {
  const url = prompt("Enter image URL");
  if (url) {
    exec('insertImage', url);
  }
}

async function exportDocx() {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = window.docx;
  const editor = document.getElementById('editor');

  function parseElement(node) {
    let children = [];
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        children.push(new TextRun(child.textContent));
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        children.push(...parseElement(child));
      }
    });
    return children;
  }

  const docChildren = [];

  editor.childNodes.forEach(node => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    switch(node.tagName.toLowerCase()) {
      case 'h1':
        docChildren.push(new Paragraph({
          text: node.textContent,
          heading: HeadingLevel.HEADING_1,
        }));
        break;
      case 'h2':
        docChildren.push(new Paragraph({
          text: node.textContent,
          heading: HeadingLevel.HEADING_2,
        }));
        break;
      case 'p':
        docChildren.push(new Paragraph({
          children: parseElement(node)
        }));
        break;
      case 'ul':
        node.querySelectorAll('li').forEach(li => {
          docChildren.push(new Paragraph({
            text: li.textContent,
            bullet: { level: 0 }
          }));
        });
        break;
      case 'ol':
        node.querySelectorAll('li').forEach(li => {
          docChildren.push(new Paragraph({
            text: li.textContent,
            numbering: {
              reference: "numbered-list",
              level: 0,
            }
          }));
        });
        break;
      default:
        docChildren.push(new Paragraph({
          children: parseElement(node)
        }));
    }
  });

  const doc = new Document({
    sections: [{
      children: docChildren,
    }],
    numbering: {
      config: [{
        reference: "numbered-list",
        levels: [{
          level: 0,
          format: "decimal",
          text: "%1.",
          alignment: AlignmentType.START
        }]
      }]
    }
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emberword.docx';
  a.click();
  URL.revokeObjectURL(url);
}
