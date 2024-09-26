document.addEventListener('DOMContentLoaded', function () {
    if (typeof marked !== 'undefined') {
        const markdownInput = document.getElementById('markdown-input');
        const htmlOutputDiv = document.getElementById('html-output');
        const convertMarkdownToHtml = () => {
            const markdownText = markdownInput.value;
            const htmlOutput = marked.parse(markdownText);
            htmlOutputDiv.innerHTML = htmlOutput;
            htmlOutputDiv.style.display = 'block';
            document.querySelectorAll('#html-output pre code').forEach((block) => {
                hljs.highlightBlock(block);
                hljs.lineNumbersBlock(block);
            });
        };
        markdownInput.addEventListener('input', convertMarkdownToHtml);
        document.getElementById('apply-css-button').addEventListener('click', function () {
            const cssText = document.getElementById('css-input').value;
            const styleElement = document.createElement('style');
            styleElement.innerHTML = `#html-output { ${cssText} }`;
            document.head.appendChild(styleElement);
        });

        document.getElementById('copy-html-button').addEventListener('click', function () {
            const htmlOutput = htmlOutputDiv.innerHTML;
            if (!htmlOutput) {
                alert('No HTML to copy!');
                return;
            }
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = htmlOutput;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextarea);
            alert('HTML copied to clipboard!');
        });
    } else console.error('Marked library is not loaded correctly.');
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#000000', '#FF5733', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF', '#9370DB', '#FF1493', '#000000'];
    let colorIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
    }, 5000);
});