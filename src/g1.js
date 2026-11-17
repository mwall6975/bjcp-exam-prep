// ===== Study guide content (paraphrased from BJCP materials; see Resources tab for originals) =====
const FAULTS=[
['Acetaldehyde','Green apple, fresh-cut grass, latex paint','Young/green beer, removed from yeast too early, poor oxygenation, bacteria.','Low level can be acceptable in Kellerbier.'],
['Alcoholic / Hot','Spicy, vinous, warming; hot burn if fusel-laden','Underpitching, low oxygen, high fermentation temperature or gravity.','Appropriate (smooth, not solventy) in Eisbock, Imperial Stout, Barleywines.'],
['Astringent','Puckering, drying, husk-like, stewed tea','Oversparging, sparge water over 170 F (77 C) or pH over 6, over-crushed grain, raw spices/pith, oxidation.','Slight in American IPA, low in American Porter, low-medium in Flanders Red.'],
['Diacetyl','Butter, butterscotch, movie popcorn, slick feel','Yeast removed too early, oxygen during fermentation, low FAN, Pediococcus. Fix with diacetyl rest 60-68 F, healthy yeast contact.','Low OK: Czech lagers, English bitters, brown/dark British beers, Irish Red. Not OK: German lagers (Kellerbier aside), Irish Stout, American and Belgian ales.'],
['DMS (dimethyl sulfide)','Cooked or canned corn, celery, cabbage, onion','SMM precursor (much higher in Pilsner malt), short/weak/covered boil, slow chilling, infection.','Low OK: American Lager, Cream Ale, International Lager, Munich Helles, German Pils. Not OK in other ales, Czech lagers, amber/dark lagers.'],
['Estery / fruity','Banana, strawberry, pear, apple, citrus','Yeast strain, warm fermentation, high gravity, underpitching, low aeration, excess trub.','Desirable in many ales (esp. Belgian, British); isoamyl acetate = banana in Weissbier.'],
['Grassy','Fresh-cut grass, green leaves','Old/wet hops or malt, oxidation, dry hopping over about 10 days.','Low in dry-hopped English IPA, APA, IPA.'],
['Light-struck','Skunk, catty, roasted coffee','UV light cleaves iso-alpha acids which react with sulfur compounds; clear/green glass.','Not acceptable in any style.'],
['Medicinal (chlorophenol)','Medicine cabinet, chloroseptic, bleach','Chlorine/chloramine in water, sanitizer residue, wild yeast, husk phenols.','Not acceptable.'],
['Metallic','Iron, blood, coins, ink','Rusty or unpassivated equipment, chipped enamel kettle, iron in water.','Not acceptable.'],
['Musty','Damp cellar, moldy, old books','Mold on ingredients or equipment, oxidation.','Not acceptable.'],
['Oxidized','Papery, cardboard (trans-2-nonenal), stale, sherry','Oxygen after fermentation, splashing, hot-side aeration, warm storage, age.','Sherry-like low-moderate OK in Old Ale, English Barleywine (low in aged Weizenbock, Oud Bruin); never paper/cardboard.'],
['Plastic / phenolic','Band-aid, electrical tape, styrene','Wild yeast or bacterial infection.','Not acceptable.'],
['Solvent / fusel','Acetone, paint thinner, hot burning on palate','Underpitching, warm fermentation, fermenting on trub.','Very low in Old Ale, Barleywine, American Strong Ale.'],
['Sour / acidic','Sharp, clean sourness (lactic or citric); yogurt-like','Infection (Lactobacillus, Pediococcus, Acetobacter).','Intentional in Berliner Weisse, Flanders Red, Oud Bruin, Lambic, Gueuze, Fruit Lambic, Gose. Optional light tartness in Saison.'],
['Smoky (phenolic)','Smoke, charcoal, burnt','Scorched mash/boil, excess dark malt, infection, smoked malt.','Rauchbier and Smoked Beer only.'],
['Spicy (phenolic)','Clove, pepper, vanilla','Yeast strain (4-vinyl guaiacol from ferulic acid), fermentation temperature.','Weissbier, some Belgian ales, Saison.'],
['Sulfury','Rotten eggs (H2S), burning matches (SO2)','Yeast stress, autolysis, sulfate water, lager fermentation by-product.','Fleeting SO2 OK in German pale lagers and Kolsch; more in Kellerbier, Australian Sparkling Ale.'],
['Vegetal','Cooked/canned/rotten vegetables','Bacterial contamination of wort, stale ingredients, old extract.','Not acceptable.'],
['Vinegary','Acetic acid, vinegar','Acetobacter (aerobic), oxidation.','Low in Flanders Red.'],
['Yeasty','Bready/doughy or meaty/brothy (autolysis)','Poor flocculation, yeast carryover; autolysis from long warm contact.','OK: unfiltered German lagers, Gose, some Belgians, Australian Sparkling Ale.']
];

const GUIDE=[
{id:'strategy',title:'Exam Strategy',icon:'target',blurb:'How the online Entrance Exam works and how to beat it.',blocks:[
{h:'The basics',list:[
'180 questions in 60 minutes, open book. You need 116 correct (64%). No penalty for wrong or blank answers, so answer everything.',
'You only get pass/fail plus a list of topic areas you missed. Retakes are allowed (once per day) but studying the missed topics first is strongly advised.',
'Passing makes you a Provisional judge (not a member, no BJCP ID). You then have 2 years to pass a Judging Exam or retake the Entrance Exam.',
'The question pool is copyrighted by BJCP; this app uses original practice questions based on the same sources.']},
{h:'Question blueprint (per exam)',list:[
'BJCP Program & Ethics: 20 True/False (drawn from a 124-question T/F pool published in the BJCP Study Guide). There is little excuse to miss these.',
'Beer styles (about 57.5%): Belgian & Sour, Brown & Dark, English & American, Lagers, Wheat, IPAs & Strong, and Pale/Dark/Lager/Mixed comparisons. Styles 1-26 only.',
'Beer characteristics (22.5%): faults, flavor origins, which style allows what.',
'Process and ingredients (20%): water, malt, hops, yeast, mashing, fermentation.',
'Question types: True/False, Multiple Choice (one best answer), and Multiple Answer ("check all that apply", no partial credit).']},
{h:'The math',list:[
'Pure guessing gets you only about 40%. Passing means reliably banking the 20 Program & Ethics questions, getting most True/False right, and narrowing multiple-choice items to two options. Open-book access to the guidelines covers the rest if you can find answers fast.',
'Multiple-Answer questions (24) are skippable: you can pass without them, but they expose gaps. Correct options match the style guideline wording; wrong ones include stylistic flaws.',
'Time budget: about 20 seconds per question. Do T/F and Program questions first, then MC, then MA. Use the Mark button and the Summary page to find unanswered items.']},
{h:'Open-book tactics',list:[
'Keep the 2021 Style Guidelines PDF and the Study Guide open and searchable (Ctrl/Cmd-F). Search for keywords from the question.',
'Words like "most appropriate", "typically" and "always" matter. A 100% statement ("all IPAs should be harsh") is usually false.',
'Never spend more than a minute on one question. Mark it and move on.']}]},
{id:'program',title:'BJCP Program & Ethics',icon:'scale',blurb:'20 of 180 questions: free points if you memorize these.',blocks:[
{h:'Exams and path',list:[
'Entrance Exam (online, pass/fail) -> Judging (tasting) Exam: proctored, closed book, 6 beers, 15 minutes each (90 min) -> Written Proficiency Exam (needed for National or higher).',
'Written Exam: closed book, 90 minutes, 20 T/F (wrong or blank = -0.5 each) + 5 essays worth 20% each. Eligibility: at least 10 judging points AND at least 80% on the Judging Exam.',
'Composite score = average of Judging and Written (50/50). Legacy exam used 70/30 essay/tasting.',
'Apprentice = took a Judging Exam and failed (under 60). Temporary: 2 years to pass the same exam, then becomes Affiliated.',
'Provisional = passed only the Entrance Exam. Not a rank, not a member, no BJCP ID. "Novice" is no longer used.']},
{h:'Ranks',table:[['Rank','Judging Exam / Composite','Total XP','Judging XP','Other'],
['Recognized','60+','0','0',''],['Certified','70+','5','2.5',''],['National','80+ (composite 80)','20','10','Written Exam required'],
['Master','composite 90','40','20',''],['Grand Master','composite 90','100','50','GMSR; each GM level +100 XP and another GMSR']],
list:['At least half of required XP must be judging points. Exam score is a minimum, not a cap.','Honorary Master is temporary for program operatives; Honorary Grand Master is permanent, no exam, not for professional brewers.','GMSR can be met by grading exams; not by simply organizing competitions or sitting on the Board.']},
{h:'Experience points',list:[
'Judges: 0.5 per session; minimum 1.0 per competition; maximum 1.5 per day. Best of Show judges earn +0.5 (competition needs 30+ entries in 5+ beer or 3+ mead/cider categories).',
'Stewards: 0.5 per day, max 1.0 per competition; they earn steward points, not judging points, even if they taste.',
'Organizer points are capped at 6.0; organizers get only organizer points (not judge/steward/staff points). Report due within 21 days.',
'Wine does not count. Judging XP: only from judging in competition or proctoring exams. Non-judging XP: organizer, staff, steward, exam admin, continuing education (CEP).',
'Active status = any BJCP activity within the last 2 years; otherwise Lapsed.']},
{h:'Ethics and conduct',list:[
'Blind judging is mandatory. Never judge a category in which you have an entry; tell the organizer so you can be reassigned. Anyone who knows which entries belong to which entrants may not judge.',
'Judges may not disqualify entries (judge director/organizer only) or move entries between categories (organizer only). Judge the beer, not the bottle.',
'Judge to the style guidelines even if you dislike the style. Calibration beers help narrow your scoring range; they are not a standard.',
'Panels: 2-4 judges (2-3 optimal). Consensus within 7 points (preferably 5 or less). Head judge leads consensus; it is not necessarily an average and rank does not override.',
'Do not consult outside judges unless the table cannot agree and all agree to ask. Do not share your thoughts until everyone has finished their sheets.',
'Courtesy minimum score: 13. Gushers: taste and score; request a second bottle. Do not score down for temperature or style mix-ups; ask staff.',
'Personal prep: no perfume, cologne, tobacco, mouthwash, or decongestants. Avoid spicy/greasy food. Water and plain bread/unsalted crackers only at the table. Use mechanical pencils, not ink.',
'Comments must be constructive and never snide. Do not speculate about process. Do not post about beers you judged on social media.',
'Entrants unhappy with feedback may contact the judge, organizer, Regional Rep or Competition Director.']},
{h:'Scoresheet and score ranges',table:[['Section','Max points'],['Aroma','12'],['Appearance','3'],['Flavor','20'],['Mouthfeel','5'],['Overall Impression','10'],['Total','50']],
list:['Outstanding 45-50 | Excellent 38-44 | Very Good 30-37 | Good 21-29 | Fair 14-20 | Problematic 0-13.','Style scales: Stylistic Accuracy, Technical Merit, Intangibles. Overall Impression covers drinking pleasure and how to improve (not comparisons with other entries).','Tasting exam grading (100 per beer): 20 scoring accuracy + 20 each for Perception, Descriptive Ability, Feedback, Completeness. Score bands: under 60 Apprentice; 60s Recognized; 70s Certified; 80s National; 90s Master.']}]},
{id:'faults',title:'Beer Characteristics & Faults',icon:'flask',blurb:'22.5% of the exam. Know the descriptor, cause, fix, and where it is allowed.',blocks:[{h:'Fault and flavor reference',faults:true},
{h:'Key principles',list:[
'Ester/fusel formation rises with fermentation temperature, gravity, underpitching and low oxygen. Lager yeast is cleaner than ale yeast.',
'Diacetyl forms during fermentation and is reabsorbed by yeast later; early racking, cold crashing, or low yeast health leave it behind. A warm diacetyl rest (60-68 F) helps.',
'DMS: SMM in malt converts under heat; a vigorous open boil and fast chilling drive it off. Pilsner malt has much more SMM than pale malt.',
'Phenols: 4-vinyl guaiacol (clove) from ferulic acid in Weissbier is intentional; plastic/medicinal phenols are faults (wild yeast, chlorine, sanitizer).',
'Astringency is a mouthfeel; tannins are extracted from husks by hot (over 170 F), high-pH (over 6.0) sparge water or oversparging, and by over-crushing.',
'Body comes from dextrins and proteins; low mash temperatures, highly attenuative yeast, fermentable adjuncts and high carbonation lighten it.',
'Sweetness: low-attenuating yeast, high mash temp, lactose (unfermentable), chloride, and ethanol up to about 5% ABV. Sulfate accentuates dryness and bitterness.',
'Head retention is helped by proteins, dextrins and iso-alpha acids, and harmed by fats/oils and soap on glassware.',
'Hop descriptors: Cascade/Centennial = grapefruit, floral; Chinook/Columbus = pine, resin; Citra = orange rind, tropical; Simcoe = grapefruit, pine, onion at high levels; Mosaic = blueberry, tangerine; Fuggles = earthy, cedar; East Kent Goldings = earthy, peppery, lemon; Saaz = spicy.']}]},
{id:'water',title:'Water, Malt & Wort',icon:'drop',blurb:'Ingredients and the front half of brewing.',blocks:[
{h:'Water',list:[
'Water is 85-95% of beer. Remove chlorine/chloramine (medicinal off-flavors). RO/distilled water lacks yeast trace minerals.',
'Target mash pH 5.1-5.5. Calcium is the most important cation: lowers mash pH, protects against oxalate haze, reduces tannin extraction, helps coagulation. Magnesium is a yeast nutrient at 10-20 ppm; harsh at high levels.',
'Bicarbonate sets alkalinity: neutralizes acids from dark malts and raises mash pH. Sulfate accentuates bitterness and dryness; chloride accentuates fullness/sweetness; sodium rounds sweetness (salty if high).',
'Pilsen: very soft (low minerals) = Czech Premium Pale Lager. Dortmund: harder, more minerals. Munich/Edinburgh: carbonate-rich, balanced by dark malts. Vienna: ambered malt. Dublin: carbonate heavy = roasted stouts. London: carbonate + sodium. Burton: very high calcium and sulfate = crisp British bitters.',
'Gypsum (calcium sulfate) + Epsom salt (magnesium sulfate) = "Burtonizing". Acid (lactic/phosphoric) or acidulated malt lowers alkaline mash pH.']},
{h:'Malt',list:[
'Barley kernel: germ, endosperm (starch), husk (cellulose/tannins). Modification = breakdown of the endosperm protein/gum matrix during malting.',
'Two-row: more extract, less protein/husk. Six-row: more protein and diastatic power, good for large adjunct additions, more husk for the filter bed.',
'Kilning: Vienna about 145 F; pale malts 130-180 F; Munich up to ~210-244 F (melanoidins); amber malt ends ~280-300 F; crystal/caramel stewed at 150-170 F then roasted; chocolate and black malts roasted 420-450 F from undermodified malt.',
'Wheat malt: head retention, huskless (mix with barley); raw wheat in Witbier and Lambic. Adjuncts: corn and rice lighten body (American lagers); cane sugar/honey dry and strengthen; flaked barley/oats add body/creaminess; lactose is unfermentable.',
'SRM examples: American Light Lager 2-3; Pilsner 2-5; Oktoberfest 7-14; Dunkles Bock 14-22; some stouts over 60.']},
{h:'Mashing and lautering',list:[
'Acid rest 95-120 F (phytase, lowers pH). Protein rest 113-127 F (proteinases/peptidases: head and yeast nutrients). Ferulic acid rest ~111 F (clove precursor).',
'Saccharification: below ~150 F (65 C) beta-amylase = more fermentable, thinner; above ~155 F (68 C) alpha-amylase = more dextrins, fuller body. Mash-out 168 F (76 C) denatures enzymes and lowers viscosity.',
'Infusion (fully modified malt; British ales), step infusion, decoction (pull ~1/3 thick mash and boil; melanoidins; classic for German lagers), double mash (cereal mash + malt mash for corn/rice).',
'Vorlauf until clear. Sparge at 160-170 F (70-77 C), pH under 6; hotter or higher pH extracts tannins. Stop sparging when runoff drops below about 1.010. Rice hulls help wheat/rye/oats.',
'Hot-side aeration of hot wort leads to oxidation (cardboard/sherry).']},
{h:'The boil and chilling',list:[
'Boil at least 1 hour (often 90 min). It isomerizes hop alpha acids, sterilizes, forms hot break, drives off DMS/volatiles, and concentrates wort. Short or covered boils raise DMS and give poor hot break.',
'Rapid chilling limits infection and forms cold break; excess cold break can give esters/fusels and haze. Irish moss or Whirlfloc in the last 10-15 minutes; gelatin and isinglass after fermentation; Polyclar for polyphenols.']}]},
{id:'hopsyeast',title:'Hops, Yeast & Fermentation',icon:'leaf',blurb:'Hop usage, yeast behavior and by-products.',blocks:[
{h:'Hops',list:[
'Noble hops: Saaz, Hallertauer Mittelfruh, Tettnanger, Spalt (low alpha, fine aroma). Other aroma: East Kent Goldings, Styrian Goldings, Fuggles, Cascade, Willamette. Bittering: Brewer\'s Gold, Nugget, Chinook, Galena. Dual: Northern Brewer, Columbus, Cluster, Perle, Centennial.',
'Alpha acids isomerize in the boil to iso-alpha acids (bitterness). IBU = mg/L iso-alpha acids. Utilization is lowered by shorter boils, higher wort gravity, hop bags, higher hop rates, older hops, lower pH.',
'Bittering 60-90 min; flavor 10-40 min; aroma at or near flame-out; dry hop in fermentation/after. First wort hopping = smoother bitterness. Pellets generally give better utilization than whole hops.',
'Sulfate in water accentuates perceived bitterness and dryness. BU:GU ratio = IBU divided by the last two digits of OG.']},
{h:'Yeast',list:[
'Ale yeast: S. cerevisiae, top-fermenting, 55-75 F (13-24 C), more esters. Lager yeast: S. pastorianus, 46-56 F (8-13 C), clean; California Common is a warm lager-yeast exception (roughly 55-68 F).',
'Weizen yeast: special S. cerevisiae strains producing clove phenols and banana esters. Lager yeast can ferment raffinose fully.',
'Bacteria and wild yeast: Lactobacillus for Berliner Weisse; Brettanomyces plus bacteria for Lambic; Pediococcus can make lactic sourness and diacetyl.',
'Pitch temperature: no more than about 75 F (24 C) for ales and 55 F (13 C) for lagers. Cool slowly (no more than about 5 F per day) to avoid cold shock.',
'Life cycle: lag -> accelerating -> exponential (esters/fusels form) -> decelerating (diacetyl reabsorption; diacetyl rest up to 68 F) -> stationary (flocculation).',
'Lagering is typically 4-6 weeks (longer for strong lagers). Bottle conditioning uses priming sugar plus yeast. Krausening adds actively fermenting wort to condition and clean up.',
'Esters rise with temperature, gravity, strain, and lower aeration. Fusels rise with temperature and gravity; poor sanitation brings wild yeast phenols.']}]},
{id:'judging',title:'Judging Procedure & Sensory',icon:'nose',blurb:'How a flight actually works; helps with ethics and characteristics questions.',blocks:[
{h:'Procedure',list:[
'Pour (agitate for head), sniff immediately and swirl; evaluate aroma, then appearance, then flavor and mouthfeel; re-check aroma. Complete each entry before starting the next. About 10 minutes per entry including consensus.',
'Scoring strategies: top-down (start from overall impression) or bottom-up (score components then total). Avoid central, extreme, halo and proximity errors; retaste top beers before awards.',
'Use clean, odor-free equipment. Mechanical pencils (no wood aroma). Plain bread or unsalted crackers and water to cleanse.',
'Taste: sweet, sour, salty, bitter, umami. Aroma fatigue is common; rest and step away from the table.',
'Doctored beers (BJCP sensory kits) train recognition: lactic acid, vinegar, tannin, iso-hop extract, clove, butter extract, banana extract, sherry, etc.']}]},
{id:'styles-intro',title:'Styles: Study Approach',icon:'glass',blurb:'57.5% of the exam: how to learn styles 1-26 efficiently.',blocks:[
{h:'What to know',list:[
'Only styles 1-26 of the 2021 guidelines appear. Historical, Smoked, Wood, Specialty (27-34) can be skipped.',
'Learn each category as a family: yeast type (lager/ale/mixed), malt color and character, hop character (noble vs British vs American), strength, and allowed fermentation by-products (esters, phenols, diacetyl, DMS).',
'Learn the Comparison notes: they power the Pale/Dark/Lager/Mixed comparison questions (e.g., APA vs IPA, Irish Stout vs American Stout, Pils vs Czech Pale Lager).',
'Key rule-outs: no diacetyl in most German lagers, Irish stouts or American/Belgian ales; clove/banana belong to Weizen styles (and some Belgian ales); sourness belongs to the sour category (optional light tartness in Saison); peat smoke does not belong in Scottish ales.',
'Use the Styles tab in this app: filter by name, and read each style\'s stats and traits. Then drill with Quiz mode on Styles categories.']}]}
];

const PLAN=[
['Week 1','Program & Ethics + Exam strategy. Take the free official practice exam cold to find your baseline. Flashcards: Program deck daily.'],
['Week 2','Faults and characteristics. Flashcards: Faults deck. Quizzes: Beer Characteristics until 80%+.'],
['Week 3','Process and ingredients: water, malt, mash, hops, yeast. Quizzes: Process & Ingredients; Multiple Answer drills.'],
['Week 4','Styles 1-13 then 14-26 (Styles tab + Style flashcards). Quizzes by style family; comparison questions.'],
['Week 5','Full mock exams (180 Q / 60 min), review every miss, retake weak categories. Take the official exam once you consistently exceed 70% on mocks.']
];
