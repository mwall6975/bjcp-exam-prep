import re, json
styles=[]
cats={}
def parse(fn):
    cat=None
    cur=None
    for line in open(fn,encoding='utf-8'):
        line=line.rstrip('\n')
        m=re.match(r'^## (?:Cat )?(\d+)\.? (.+)$',line)
        if m:
            cat=(int(m.group(1)),m.group(2).title().replace(' And ',' and ').replace('Ipa','IPA')); cats[cat[0]]=cat[1]; cur=None; continue
        m=re.match(r'^#{3,4} (\d+[A-G]?) (.+?)(?: \(.*)?$',line)
        if m:
            code,name=m.group(1),m.group(2)
            sub=None
            if line.startswith('####'): sub=name
            cur={'code':code,'name':name,'cat':cat[0],'catName':cat[1],'lines':[]}
            if line.startswith('####'):
                cur['name']='Specialty IPA: '+name; cur['code']='21B'
            styles.append(cur); continue
        if cur is None: continue
        if re.search(r'OG\s*[\d.]+\s*-\s*[\d.]+',line) and 'FG' in line:
            nums=re.findall(r'(OG|FG|IBU|SRM|ABV)\s*([\d.]+)\s*-\s*([\d.]+)',line)
            cur['stats']={k:[float(a),float(b)] for k,a,b in nums}
            continue
        if line.startswith('- ') or line.startswith('Generic') or line.startswith('Category'):
            cur['lines'].append(line.lstrip('- ').strip())
parse('bjcp-styles_reference_v1.md'); parse('bjcp-styles-14-26_reference_v1.md')
for s in styles:
    s['text']=s.pop('lines')
nostats=[s['code']+' '+s['name'] for s in styles if 'stats' not in s]
print(len(styles),'styles; no stats:',nostats)
# 21B parent has no stats
json.dump({'cats':cats,'styles':styles},open('styles.json','w'),ensure_ascii=False)
for s in styles[:3]+styles[-2:]: print(s['code'],s['name'],s.get('stats'),len(s['text']))
