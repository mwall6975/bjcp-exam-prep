#!/usr/bin/env python3
"""Assemble src/ into the single-file app: python3 build.py  ->  index.html"""
import json, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src'))
read = lambda f: open(f, encoding='utf-8').read()
data = ''.join(read(f) for f in ['q1.js', 'q2.js', 'q3.js', 'g1.js', 'g2.js'])
sty = 'const STYLEDATA=' + json.dumps(json.load(open('styles.json', encoding='utf-8')), ensure_ascii=False) + ';'
html = read('app_head.html') + sty + '\n' + data + '\n' + read('app1.js') + '\n' + read('app2.js') + '\n</script>\n</body>\n</html>\n'
open('../index.html', 'w', encoding='utf-8').write(html)
print('index.html', len(html), 'bytes')
