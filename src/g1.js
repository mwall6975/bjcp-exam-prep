// ===== Study guide content (paraphrased from BJCP materials; see Resources tab for originals) =====
const FAULTS=[
['Acetaldehyde','Green apple, fresh-cut grass, latex paint','Young/green beer, removed from yeast too early, poor oxygenation, bacteria.','Not appropriate in most styles; treat as a fault.'],
['Alcoholic / Hot','Spicy, vinous, warming; hot burn if fusel-laden','Underpitching, low oxygen, high fermentation temperature or gravity.','Appropriate (smooth, not solventy) in Eisbock, Imperial Stout, Barleywines.'],
['Astringent','Puckering, drying, husk-like, stewed tea','Oversparging, sparge water over 170 F (77 C) or pH over 6, over-crushed grain, raw spices/pith, oxidation.','Slight in American IPA, low in American Porter, low-medium in Flanders Red.'],
['Diacetyl','Butter, butterscotch, movie popcorn, slick feel','Yeast removed too early, oxygen during fermentation, low FAN, Pediococcus. Fix with diacetyl rest 60-68 F, healthy yeast contact.','Low OK: Czech lagers, English bitters, brown/dark British beers, Irish Red. Not OK: German lagers, generally Irish Stout, most American and Belgian ales.'],
['DMS (dimethyl sulfide)','Cooked or canned corn, celery, cabbage, onion','SMM precursor (much higher in Pilsner malt), short/weak/covered boil, slow chilling, infection.','Low OK: Cream Ale (low DMS is optional). Not listed as appropriate in most other styles, including American Lager, Munich Helles, German Pils and Czech lagers.'],
['Estery / fruity','Banana, strawberry, pear, apple, citrus','Yeast strain, warm fermentation, high gravity, underpitching, low aeration, excess trub.','Desirable in many ales (esp. Belgian, British); isoamyl acetate = banana in Weissbier.'],
['Grassy','Fresh-cut grass, green leaves','Old/wet hops or malt, oxidation, dry hopping over about 10 days.','Low in dry-hopped English IPA, APA, IPA.'],
['Light-struck','Skunk, catty, roasted coffee','UV light cleaves iso-alpha acids which react with sulfur compounds; clear/green glass.','Not acceptable in any style.'],
['Medicinal (chlorophenol)','Medicine cabinet, chloroseptic, bleach','Chlorine/chloramine in water, sanitizer residue, wild yeast, husk phenols.','Not acceptable.'],
['Metallic','Iron, blood, coins, ink','Rusty or unpassivated equipment, chipped enamel kettle, iron in water.','Not acceptable.'],
['Musty','Damp cellar, moldy, old books','Mold on ingredients or equipment, oxidation.','Not acceptable.'],
['Oxidized','Papery, cardboard (trans-2-nonenal), stale, sherry','Oxygen after fermentation, splashing, hot-side aeration, warm storage, age.','Sherry-like low-moderate OK in Old Ale, English Barleywine (Oud Bruin); never paper/cardboard.'],
['Plastic / phenolic','Band-aid, electrical tape, styrene','Wild yeast or bacterial infection.','Not acceptable.'],
['Solvent / fusel','Acetone, paint thinner, hot burning on palate','Underpitching, warm fermentation, fermenting on trub.','Not acceptable. Strong ales may show evident alcohol or warmth, but it must not be solventy or hot.'],
['Sour / acidic','Sharp, clean sourness (lactic or citric); yogurt-like','Infection (Lactobacillus, Pediococcus, Acetobacter).','Intentional in Berliner Weisse, Flanders Red, Oud Bruin, Lambic, Gueuze, Fruit Lambic, Gose. Optional light tartness in Saison.'],
['Smoky (phenolic)','Smoke, charcoal, burnt','Scorched mash/boil, excess dark malt, infection, smoked malt.','Rauchbier and Smoked Beer only.'],
['Spicy (phenolic)','Clove, pepper, vanilla','Yeast strain (4-vinyl guaiacol from ferulic acid), fermentation temperature.','Weissbier, some Belgian ales, Saison.'],
['Sulfury','Rotten eggs (H2S), burning matches (SO2)','Yeast stress, autolysis, sulfate water, lager fermentation by-product.','Fleeting SO2 OK in German pale lagers and Kolsch; fresh Australian Sparkling Ale may be slightly sulfury.'],
['Vegetal','Cooked/canned/rotten vegetables','Bacterial contamination of wort, stale ingredients, old extract.','Not acceptable.'],
['Vinegary','Acetic acid, vinegar','Acetobacter (aerobic), oxidation.','Low in Flanders Red.'],
['Yeasty','Bready/doughy or meaty/brothy (autolysis)','Poor flocculation, yeast carryover; autolysis from long warm contact.','OK: Weissbier (when yeast is roused), Gose, some Belgians, Australian Sparkling Ale.']
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
{id:'water',title:'Water, Malt & Wort',icon:'drop',blurb:'Ingredients and the front half of brewing. Summarized in our own words from the BJCP Beer Exam Study Guide sections on Water, Malt and Adjuncts, and Wort Production.',blocks:[
{h:'Water basics',list:[
'Water is 85-95% of beer. If tap water is drinkable it can generally be used, with mineral tweaks to mimic historical styles. It must be boiled at some point, since most water carries a few bacteria.',
'Remove chlorine and chloramines (medicinal, chlorophenol off-flavors). RO and distilled water are stripped of trace minerals yeast need (iron, manganese, copper, zinc), so mineral water is often a better base.']},
{h:'Alkalinity, pH and hardness',list:[
'pH 7 is neutral; lower is acidic, higher is alkaline. In brewing, pH depends on hardness, alkalinity and the buffering salts that come from the ingredients.',
'Alkalinity is the water\'s capacity to neutralize acid, and bicarbonate (HCO3-) is the ion that sets it. Boiling precipitates calcium carbonate, which removes calcium and bicarbonate and lowers alkalinity.',
'Temporary hardness comes from carbonate/bicarbonate salts and disappears with boiling. Permanent hardness (mostly calcium and magnesium from sulfate or chloride salts) stays after boiling.',
'A 100% Pils-malt mash in distilled water (pH 7.0) still falls to about pH 5.7-5.8, because malt phytin breaks down to phytic acid and phosphates. Calcium helps release hydrogen ions. The mash target is pH 5.1-5.5, the range for starch and protein breakdown.',
'If water is too alkaline for a pale beer, add lactic or phosphoric acid, or acidulated malt (made with lactic acid from Lactobacillus on the grain). Dark crystal or roasted malt at about 20% of the grist can lower pH by about 0.5, which is why dark styles suit carbonate-rich water.']},
{h:'Ions in brewing',list:[
'Calcium: the key cation. Lowers mash pH, keeps oxalate in solution (oxalate haze and gushing), reduces tannin extraction, helps hot and cold break coagulation.',
'Magnesium: works like calcium but less effectively. Yeast need 10-20 ppm as a nutrient; more tastes harsh and minerally.',
'Sodium: accents sweetness at low levels, salty when high (part of Gose). Chloride: enhances sweetness and fullness; high levels can hamper yeast flocculation.',
'Bicarbonate: sets alkalinity, neutralizes acids from dark and roasted malts, and promotes tannin and color extraction. Sulfate: accents hop bitterness and dryness at Burton-level concentrations.']},
{h:'Famous brewing waters (ppm)',table:[['City','Calcium','Magnesium','Sodium','Sulfate','Bicarbonate','Chloride'],['Plzen','10','3','3','4','3','4'],['Dortmund','225','40','60','120','220','60'],['Munich','109','21','2','79','171','36'],['Vienna','163','68','8','216','243','39'],['Burton','352','24','44','820','320','16'],['Dublin','118','4','12','54','319','19'],['Edinburgh','100','18','20','105','160','45'],['London','52','32','86','32','104','34']],list:[
'Plzen: very low hardness and alkalinity, so base malts alone reach mash pH; no sulfate gives the rounded malt and mellow bitterness of Czech Premium Pale Lager.',
'Dortmund: higher minerals give bolder, drier, lighter-colored pale lagers (Dortmunder Export, German Pils).',
'Munich and Edinburgh: similar profiles. Darker malts balance the carbonate and acidify the mash for smooth malt character and mellow bitterness (amber and dark German lagers, Scottish ales).',
'Vienna: calcium too low for the bicarbonate in a pale mash. Higher-kilned malt (more color and acidity) solved it and led to Vienna lager.',
'Dublin: even greater calcium/bicarbonate imbalance led to Irish Stout with lots of roasted barley; low sodium, chloride and sulfate soften the finish.',
'London: bicarbonate nearly twice calcium, so more dark malt was needed (Dark Mild, English Porter); high sodium and low sulfate smooth the flavor.',
'Burton: very high calcium (balanced by bicarbonate) and very high sulfate give lighter British bitters with an assertive, clean hop bitterness.']},
{h:'Water adjustment',list:[
'Common salts: gypsum (calcium sulfate), Epsom salt (magnesium sulfate), non-iodized table salt, calcium carbonate, calcium chloride. Gypsum plus Epsom salt is Burtonizing.',
'For mash buffering, base additions on the mash water volume. For flavor adjustments to the finished beer, base them on the final beer volume.']},
{h:'Barley and malting',list:[
'Barley kernel: germ, starchy endosperm (food for the embryo), and a cellulose husk. The acrospire (future shoot) grows from the germ end; its length relative to the kernel has been used as a measure of modification.',
'Modification means breaking down the protein/gum matrix of the endosperm and making proteins soluble. A fully modified malt (ratio 1.0) is low in protein but loses some starch yield to plant growth. Undermodified malt has a fuller set of enzymes but needs more protein breakdown to avoid chill haze. Most modern malt is highly modified, so long protein rests are rarely needed.',
'Two-row has bigger kernels, higher yield, less protein and husk (less grainy taste). Six-row has more protein and diastatic power (enzymes), so it suits large adjunct additions, and extra husk helps the filter bed. Four-row is really a six-row variety and is little used.',
'Malting: steep barley in 50-65 F (10-18 C) water for 2-3 days, germinate 6-10 days at 50-70 F (10-20 C), then dry gently (about 90 F, then 120 F) until bone-dry before higher kilning heat so enzymes survive. Continental and American malts are typically modified about 50-75%.',
'Cell walls break down first (cytase complex, including beta-glucanases), clearing the way for other enzymes. Malts should rest for about a month after kilning before mashing.']},
{h:'Kilning and malt types',table:[['Malt','How it is made'],['Vienna','Low-kilned at about 145 F (63 C)'],['British and American pale','Kilned about 130-180 F (55-80 C)'],['Czech','Dried slowly from 120 to 170 F (50-75 C), then roasted near 178 F (80 C)'],['Dortmund','Low temperature start, then raised to about 195-205 F (90-95 C); builds melanoidins'],['Munich','Same approach, finishing about 210-244 F (100-120 C); builds melanoidins'],['Amber','Well modified, dried, rapidly heated to about 200 F (95 C), then 280-300 F (140-150 C) until color is reached'],['Crystal / caramel','Fully modified, held at about 150-170 F (65-75 C) for 1.5-2 hours while still moist (mashes the starch inside the husk), then roasted for color'],['Chocolate / black patent','Undermodified (less than half), dried to about 5% moisture, roasted 420-450 F (215-230 C) for up to 2 hours; no protein rest needed'],['Smoked','Beechwood smoke (Bamberg) adds phenolic smokiness; peat smoke is used for whiskey malt']],list:[
'Melanoidins form from amino acids and malt sugars during kilning and add flavor and body. After kilning, malt is cooled below 100 F (40 C) and rootlets are removed.']},
{h:'What is in malt',list:[
'Starches become sugars via diastatic enzymes. Enzymes are proteins, so protein content indicates enzyme strength. Proteins are reduced to peptides and amino acids; B-vitamin peptides help yeast.',
'Phosphates acidify the mash and feed yeast. Husk polyphenols and tannins give harsh flavors if leached by hot or alkaline sparge water.',
'Fatty acids and lipids carried into wort can cause oxidative off-flavors and poor head retention. Hemicellulose and gums (about 10% of kernel weight) must be broken down for head retention and clarity.']},
{h:'Other grains, adjuncts and color',list:[
'Wheat malt: main malted grain after barley (German and American wheat beers; small amounts help head retention). Enough enzymes to convert itself, but huskless, so it is mashed with barley malt for the filter bed. High protein and glucan content may call for a longer protein rest. Rye, oats and sorghum are more often used raw.',
'Cereal adjuncts (corn, rice, flaked barley, flaked rye, raw or flaked wheat) are cheap carbohydrate with little protein, so they pair with high-protein six-row for a more fermentable, less filling wort. Starch must be gelatinized first: cereal-mash boil or hot flaking. Corn and rice are used heavily in American light lagers; raw wheat is key in Belgian white beer and lambic.',
'An adjunct is any unmalted fermentable source. Corn and cane sugar are fully fermentable (more alcohol, drier). Honey adds aroma but makes beer thinner and more alcoholic. Malto-dextrin, or a bigger dextrin share from the malt bill or mash, gives fuller palate. Caramel, molasses, maple syrup and licorice add color, flavor and fermentables.',
'Color: EBC (Europe) and SRM (USA), low numbers lighter. Study guide examples: American light lager 2-3, Pilsner 2-5, Oktoberfest 7-14, Dunkles Bock 14-22, some stouts over 60. (The 2021 style guidelines give Marzen 8-17 and Festbier 4-6; for style questions, go by the guidelines.) The boil\'s intensity and length also affect color.']},
{h:'Mashing: rests and enzymes',list:[
'Acid rest 95-120 F (35-50 C): phytase breaks phytin down, acidifying a low-calcium pale mash; beta-glucanases break down gums (important with rye and undermodified malt, to avoid stuck mashes).',
'Protein rest 113-127 F (45-53 C): proteinases then peptidases make polypeptides, peptides and amino acids. Head formation needs polypeptides; yeast nutrition needs smaller fractions.',
'Starch conversion: barley-malt starch gelatinizes at 130-150 F (55-65 C); raw grains gelatinize hotter, so boil or hot-flake them first. Debranching enzymes, alpha-amylase (random 1-4 cuts) and beta-amylase (maltose from chain ends) work together.',
'Below about 150 F (65 C) beta-amylase dominates: more fermentable, thinner beer. Above about 155 F (68 C) alpha-amylase dominates: more dextrins, fuller body. Maltotriose is slowly fermentable and sustains yeast during lagering; dextrins are unfermentable.',
'Mash-out at 168 F (76 C) halts the amylases and lowers viscosity for easier lautering; best extraction is generally achieved around this temperature.']},
{h:'Mash methods',list:[
'Dough-in: about 1-2 liters water per pound of grain (2-4 liters per kilogram).',
'Single infusion: one hot-water rest; least labor and equipment; for fully modified malts (British ales). Cannot handle undermodified malt or adjuncts. Step infusion: a series of rests, so undermodified malts can be used.',
'Decoction: pull about a third of the thick mash, rest briefly at saccharification temperature, boil 15-30 minutes, return it; repeated up to three times. Breaks down protein matrix, improves extraction and builds melanoidins; most resource-intensive; traditional for many lagers. May extract more tannins and DMS precursors, though not significantly at normal pH.',
'Double mash: a cereal mash (raw adjunct plus a little malt, boiled at least an hour) is added to a main mash that has had an acid rest, then step-infused. Standard for American light lagers with corn or rice.']},
{h:'Lautering and sparging',list:[
'Lautering separates sweet wort from grain, in a lauter tun with a false bottom. When moving mash between vessels, avoid splashing: hot-side aeration causes sherry-like, wet paper or cardboard oxidation.',
'Vorlauf: recirculate the first runoff until clear. Skipping it or lautering too fast hurts yield and flushes starch and protein into the wort (astringency, haze).',
'Keep 160-170 F (70-77 C). Above 170 F (77 C) tannins leach and starch balls burst through the filter bed; unconverted starch can later feed wild yeast or bacteria.',
'Stuck sparge: not enough husk in the grain bed. Wheat, rye and oat mashes need rice hulls (flavor- and gravity-neutral); their gums may also need a beta-glucanase rest.',
'Sparge water should match mash water chemistry, pH about 5.7 so mash pH stays under 6.0, added slowly at about 170 F. First runnings should be about twice the desired final gravity. Stop when gravity falls below about 1.010 or runoff pH exceeds 6.0.']},
{h:'The boil',list:[
'Reasons to boil: isomerize hop alpha acids; stop enzymes; kill bacteria and wild yeast; coagulate proteins and polyphenols (hot break); drive off harsh hop oils, sulfur compounds, ketones and esters; form melanoidins and caramelize some sugars (not wanted in every style); concentrate wort (a side effect).',
'At least 1 hour; all-grain brews often use 90 minutes with bittering hops in the last hour. Evaporation is about 1 gallon (4 L) per hour. Boil uncovered so volatiles escape instead of condensing back.',
'A short boil under-utilizes hops, weakens head (hop compounds bind polypeptides into colloids), hurts clarity and shelf life (poor hot break) and reduces preservative value. Historical exception: Berliner Weisse hops were added to the mash and the wort was not boiled; Lactobacillus and ale yeast fermented it.',
'Wort pH should fall during the boil to 5.2-5.5; if it starts below 5.2, protein precipitation is retarded. Boiling first runnings of high-gravity wort caramelizes them (appropriate for Scottish ales, not light lagers).']},
{h:'Chilling and fining',list:[
'Chill as fast as possible (immersion or counterflow) to cut Lactobacillus and spoilage risk and to form cold break (protein-protein and protein-polyphenol complexes). Cold break can supply yeast sterol precursors, but too much leads to more esters and fusels and chill or permanent haze.',
'Kettle fining: Irish moss (red seaweed) or Whirlfloc tablets (seaweed with extra purified carrageenan) in the last 10-15 minutes.',
'After fermentation: silica hydrogels, gelatin (animal collagen), isinglass (fish bladder), and Polyclar (a powdered plastic that binds protein-polyphenol complexes). Gelatin and isinglass are dissolved in hot, not boiling, water and added a few days before racking or bottling.']}]},
{id:'hopsyeast',title:'Hops, Yeast & Fermentation',icon:'leaf',blurb:'Hop usage, yeast behavior and by-products. Summarized in our own words from the BJCP Beer Exam Study Guide sections on Hops and on Yeast and Fermentation.',blocks:[
{h:'Hop basics',list:[
'Hops (Humulus lupulus cones) balance malt sweetness and also add bacteriological stability, kettle coagulation and head stability. The lupulin glands hold alpha acids and essential oils.',
'Noble hops: Saaz, Spalt, Tettnanger, Hallertauer Mittelfruh (low alpha, prized aroma). The aroma/bittering/dual-purpose split is subjective. Aroma examples: East Kent and Styrian Goldings, Fuggles, Cascade, Willamette, Liberty, Crystal, Mount Hood. Bittering: Brewer\'s Gold, Nugget, Chinook, Eroica, Galena, Bullion. Dual-purpose: Northern Brewer, Columbus, Cluster, Perle, Centennial.',
'Hops were in use before 1000 AD and became standard through the 1516 Reinheitsgebot. Forms: whole cones, plugs (compressed 1/2 oz or 15 g disks, also called type-100 pellets), pellets, and extracts (isomerized extracts for bitterness; aroma essences).']},
{h:'Bitterness and utilization',list:[
'Alpha acids (humulone, cohumulone, adhumulone) isomerize to iso-alpha acids in a vigorous boil, becoming more soluble and more bitter. Essential oils are volatile and do not survive long boils, so flavor and aroma hops go in late.',
'AAU/HBU = ounces of hops times alpha acid %; it measures potential bitterness only and needs batch size to mean anything. IBU = mg/L of isomerized alpha acids in finished beer. IBU = 7489 x (W x A x U) / V (US units); utilization U tops out near 30% at home and is often lower. The only true IBU measurement is lab analysis.',
'Utilization falls with: shorter contact time or lower boil temperature, higher wort gravity, whole hops instead of pellets, higher hopping rate, hop bags, older hops, lower wort pH, more flocculent yeast, and filtering. Staling also reduces bitterness.',
'Perceived bitterness is affected by water (carbonate and sulfate) and by attenuation. BU:GU = IBU divided by the last two digits of OG. Examples from the guide: Festbier about 18-25 IBU, Czech Premium Pale Lager about 30-45 IBU.']},
{h:'When hops go in',list:[
'Bittering: 60-90 minutes of vigorous boil. Flavor hops: about 10-40 minutes. Aroma: at or near the end of the boil (little or no bitterness). Dry hops (during or after fermentation): fresh hop aroma.',
'Oxidation (staling) reduces bitterness, adds a harsh edge and dulls aroma.',
'First wort hopping: hops go in the first runnings; higher pH may extract finer flavor. Gives a smoother, more pleasant bitterness and a fresh hop flavor; an old German method originally used for Pilsner-type beers.']},
{h:'Hop varieties and character',table:[['Hop','Character (per the study guide)'],['East Kent Goldings','Earthy, peppery, lemon-like'],['Fuggles','Earthy with cedar, tobacco, floral notes'],['Challenger','Tea-like earthiness, light citrus'],['Saaz','Characteristic spicy aroma and flavor (Czech Premium Pale Lager)'],['Tettnanger, Hallertauer Mittelfruh, Spalt','Slightly peppery or woody spice, soft floral or light citrus; low-alpha Spalt gives Altbier its clean bitterness'],['Cascade / Centennial','Grapefruit and floral (Centennial a bit more floral)'],['Columbus / Chinook','High alpha; assertive pine and resin, herbal, light citrus'],['Amarillo','Orange blossom in modest amounts; catty in large finishing or dry-hop amounts'],['Citra','Orange or orange rind with tropical fruit (mango, passion fruit, pineapple)'],['Simcoe','Grapefruit, pine, tropical fruit; raw onion at higher levels'],['Mosaic','Blueberry, tangerine, pineapple, ripe peach']],list:[
'British ales are tied to native hops (Goldings, Northern Brewer, Challenger, Fuggles). German pale lagers use German nobles. Low-alpha nobles also give soft bitterness to less hop-forward lagers (Dunkles Bock, Munich Helles). American pale ale and American brown ale lean on floral, citrusy American hops; New World hops dominate American IPA, Double IPA and American Strong Ale.',
'Growing region matters as much as variety: classic European varieties grown in the US taste different.']},
{h:'Yeast basics',list:[
'Ale yeast is S. cerevisiae; lager yeast is S. pastorianus (older names S. carlsbergensis, S. uvarum). They differ in temperature range, sugars fermented, flocculation and by-products.',
'Apparent attenuation = (OG - FG) / OG, as read on a hydrometer (alcohol is lighter than water, so it is not real attenuation). Flocculation is how well yeast settles out. Most lager strains tolerate about 8% ABV; some ale strains reach 12%.',
'Ale yeast: best at 55-75 F (13-24 C); apparent attenuation about 69-80%; ferments glucose, fructose, maltose, sucrose, maltotriose; only partly ferments raffinose. Traditionally top-fermenting (clings in colonies at the surface). Produces more esters. Weizen strains are special: clove phenols and banana esters. The study guide also lists "bubblegum"; the 2021 style guidelines treat bubblegum (strawberry with banana) as a fault.',
'Lager yeast: best at 46-56 F (8-13 C); the study guide gives California Common yeast 58-68 F (the 2021 style guidelines say about 55-60 F). Apparent attenuation about 67-77%; ferments raffinose fully; bottom-fermenting; cleaner, with fewer esters and fusels. Frohberg type (dusty/powdery): ferments fast, flocculates poorly, higher attenuation. Saaz type (S.U./break): flocculates readily, lower attenuation.',
'Other microbes: Lactobacillus delbrueckii for Berliner Weisse. Lambic uses Brettanomyces and bacteria; Gram-negative ones (E. coli, Citrobacter, Enterobacter) die in alcohol, while Gram-positive Pediococcus and Lactobacillus make lactic sourness (and, at low contamination, diacetyl).']},
{h:'Fermentation by-products',list:[
'Esters: fruity and sweet (ethyl acetate, isoamyl acetate, ethyl hexanoate are the usual ones above threshold). Fusel alcohols: higher alcohols from amino acid metabolism, harsh and solvent-like. Diacetyl: buttery, normally reduced late in fermentation, elevated if yeast is removed too early. Sulfur: hydrogen sulfide smells like rotten eggs.',
'Esters rise with strain, higher gravity (Trappist-style esters), warmer temperature (about four times more from 60 to 68 F / 16-20 C) and less oxygen (ester formation competes with sterol synthesis). Warm-fermented lager yeast can give esters (Biere de Garde).',
'Fusels rise with temperature and gravity; wild yeast and poor sanitation add more. Phenols come from wild yeast (control with sanitation), except German wheat beers, where a special S. cerevisiae makes 4-vinylguaiacol (clove) from ferulic acid; a ferulic acid rest at 111 F (44 C) boosts it.',
'Diacetyl: precursors form during yeast metabolism and convert during active fermentation (more with heat and oxygen). Only yeast can remove diacetyl, by converting it to nearly flavorless butanediol, and warmth boosts that reduction even more than formation, so a diacetyl rest lowers diacetyl. Early racking or crash-cooling off the yeast raises it; Gram-positive bacteria also make it.']},
{h:'The yeast life cycle',list:[
'Lag: yeast adapt using glycogen reserves; short with healthy yeast, long and risky with unhealthy yeast.',
'Accelerating (low krausen): budding begins, with only one to three doublings if enough healthy yeast is pitched. Oxygen is used for sterol synthesis; cold trub may supply fatty acids. If wort has more than 0.4% glucose, yeast ferment glucose even with oxygen present (glucose repression, the Crabtree effect).',
'Exponential (high krausen): maximum growth rate; esters and fusels form. To minimize them: enough free amino nitrogen (FAN), chill to no more than 75 F (24 C) for ales and 55 F (13 C) for lagers before pitching, aerate sufficiently but not excessively, hold temperature in the strain\'s range.',
'Decelerating (late krausen): ales have used most sugar; lagers may still drop about 4 gravity points a day and reabsorb by-products. A diacetyl rest (up to about 68 F / 20 C) fits here.',
'Stationary: cells stable, krausen falls, yeast flocculate. A good time to rack off the excess yeast and trub (prevents autolysis). Ale conditioning is brief; lager conditioning runs 4-6 weeks, up to 6 months for strong lagers. Do not cool faster than about 5 F (3 C) per day or yeast may be cold-shocked, and keep air out.']},
{h:'Conditioning and packaging',list:[
'Bottle conditioning: a fresh yeast starter (about 250 ml per 5 gallons / 20 L) plus corn sugar, common in Trappist-style Belgian ales.',
'Krausening: add actively fermenting beer at high krausen (typically about 20% by volume) to carbonate and clean up off-flavors; common with German lagers.']}]},
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
