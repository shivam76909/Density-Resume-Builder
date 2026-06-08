import re

with open('js/live-preview.js', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(m):
    text = m.group(0)
    # Add line-height: 1.1; to the contact text items
    text = re.sub(r'(id="modern-(phone|email|location|linkedin|github|portfolio)-text".*?width: 100%;)', r'\1 line-height: 1.1;', text)
    # Also let's reduce the gap of the container from 1.5px to 1px just in case
    text = text.replace('gap: 1.5px;', 'gap: 1px;')
    return text

content = re.sub(r'function getModernHtml\(\) \{.*?(?=function \w+Html)', repl, content, flags=re.DOTALL)

with open('js/live-preview.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated contact text line-height and gap!')
