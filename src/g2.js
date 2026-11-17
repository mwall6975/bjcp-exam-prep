
const FLASH=[];
const F=(d,f,b)=>FLASH.push({deck:d,f,b});
FAULTS.forEach(x=>{
  F('faults','Name this flavor/aroma: '+x[1],x[0]+' - '+x[3]);
  F('faults','Causes and fix: '+x[0],x[2]);
});
// Program
[
['Passing score on the Beer Entrance Exam','116 of 180 correct (64%). No penalty for wrong answers.'],
['Entrance Exam length and time','180 questions, 60 minutes, open book.'],
['Entrance Exam question blueprint','20 Program & Ethics T/F + 160 others: styles 57.5%, characteristics 22.5%, process/ingredients 20%.'],
['After passing the Entrance Exam you are a...','Provisional judge: not a rank, not a member, no BJCP ID. 2 years to pass a Judging Exam.'],
['Beer Judging (tasting) Exam format','Proctored, closed book, 6 beers, 15 minutes each (90 minutes).'],
['Written Proficiency Exam format','Closed book, 90 minutes: 20 T/F (-0.5 per wrong/blank) + 5 essays (20% each).'],
['Written Exam eligibility','10+ judging points AND 80%+ on the Judging Exam.'],
['Composite score formula','Judging Exam and Written Exam averaged 50/50 (legacy exam was 70/30).'],
['Recognized rank requirements','Judging Exam score 60+. No experience points.'],
['Certified rank requirements','Judging Exam score 70+ and 5 experience points (2.5+ judging).'],
['National rank requirements','Composite 80, 20 experience points (10+ judging), Written Exam.'],
['Master rank requirements','Composite 90, 40 experience points (20+ judging).'],
['Grand Master requirements','Composite 90, 100 experience points (50+ judging), plus Grand Master Service Requirement. Each level adds 100 XP and another GMSR.'],
['Apprentice','Took a Judging Exam and failed (under 60). Temporary; 2 years to pass, then Affiliated.'],
['Honorary Grand Master','Awarded by the board for extraordinary service; no exam; permanent; not for pro brewers.'],
['Scoresheet point values','Aroma 12, Appearance 3, Flavor 20, Mouthfeel 5, Overall Impression 10 = 50.'],
['Score ranges','Outstanding 45-50; Excellent 38-44; Very Good 30-37; Good 21-29; Fair 14-20; Problematic 0-13.'],
['Courtesy minimum score','13'],
['Consensus rule','Panel scores within 7 points (ideally 5 or less). Head judge leads; not necessarily the average.'],
['Judging panel size','2 to 4 judges (2-3 optimal).'],
['Judge experience points per session','0.5 per session; min 1.0 per competition; max 1.5 per day.'],
['Best of Show judge bonus','+0.5 point; competition needs 30+ entries in 5+ beer or 3+ mead/cider categories.'],
['Steward points','0.5 per day, max 1.0 per competition. Not judging points.'],
['Organizer points cap and report','Capped at 6.0; report due within 21 days.'],
['Active status','BJCP activity within the last 2 years.'],
['Who may disqualify or recategorize an entry?','Disqualify: judge director/organizer only. Re-categorize: organizer only. Never the judging panel.'],
['What to do if you have an entry in the category you are assigned?','Tell the organizer/judge director and ask to be reassigned.'],
['Mead and Cider Entrance Exams','Mead: 200 Qs, 60 min. Cider: 100 Qs, 30 min.'],
['Tasting exam score bands','Under 60 Apprentice; 60s Recognized; 70s Certified; 80s National; 90s Master.'],
['Things to avoid before judging','Perfume/cologne, tobacco, mouthwash, decongestants, spicy/greasy food.'],
['Preferred writing tool for scoresheets','Mechanical pencil (no wood odor).']
].forEach(c=>F('program',c[0],c[1]));
// Process and ingredients
[
['Noble hops','Saaz, Hallertauer Mittelfruh, Tettnanger, Spalt.'],
['Typical hops for English bitters','East Kent Goldings, Fuggles (also Challenger, Northern Brewer).'],
['Cascade / Centennial character','Grapefruit, floral (Centennial more floral).'],
['Chinook / Columbus character','Pine, resin, herbal, light citrus.'],
['Citra character','Orange rind, tropical fruit (mango, passion fruit).'],
['Simcoe character','Grapefruit, pine, tropical; onion/garlic at high levels.'],
['Mosaic character','Blueberry, tangerine, pineapple, ripe peach.'],
['Alpha acid to bitterness','Alpha acids isomerize during the boil to iso-alpha acids (the bitterness).'],
['Factors that lower hop utilization','Shorter boil, higher wort gravity, hop bags, higher hopping rate, older hops, lower pH.'],
['First wort hopping','Hops added to first runnings; smoother, more refined bitterness.'],
['Mash temperature effect','Under ~150 F (65 C): beta-amylase, fermentable, thinner. Over ~155 F (68 C): alpha-amylase, dextrinous, fuller.'],
['Mash-out','~168 F (76 C): denatures enzymes, lowers viscosity.'],
['Protein rest','113-127 F (45-53 C): proteinases/peptidases; head retention and yeast nutrients.'],
['Acid rest','95-120 F (35-50 C): phytase lowers mash pH.'],
['Ferulic acid rest','~111 F (44 C): boosts clove phenol precursor for Weissbier.'],
['Decoction mash','Pull about 1/3 thick mash, boil, return: melanoidins; traditional for malty lagers.'],
['Double mash','Main malt mash + boiled cereal mash (corn/rice); American light lagers.'],
['Mash pH target','5.1-5.5'],
['Sparge conditions','160-170 F (70-77 C), pH under 6.0; hotter or higher pH extracts tannins.'],
['Boil purposes','Isomerize alpha acids, sterilize, hot break, drive off volatiles like DMS, concentrate.'],
['Kettle finings','Irish moss/Whirlfloc in the last 10-15 min.'],
['Post-fermentation finings','Gelatin, isinglass, silica gel, Polyclar.'],
['Ale yeast','S. cerevisiae, top-fermenting, 55-75 F (13-24 C), more esters.'],
['Lager yeast','S. pastorianus, bottom-fermenting, 46-56 F (8-13 C), clean.'],
['California Common yeast','Lager yeast fermented warm (roughly 55-68 F).'],
['Diacetyl rest','Warm the beer (up to ~68 F) near end of fermentation so yeast reabsorb diacetyl.'],
['Lagering duration','About 4-6 weeks (longer for strong lagers).'],
['Krausening','Adding actively fermenting wort to finished beer to carbonate and clean up.'],
['Max pitching temperature','Ales about 75 F (24 C); lagers about 55 F (13 C).'],
['Two-row vs six-row','Two-row: more extract, less protein. Six-row: more protein and enzymes; good for adjuncts.'],
['Crystal/caramel malt process','Stewed at saccharification temps (150-170 F) then roasted.'],
['Chocolate/black malt process','Undermodified, roasted 420-450 F.'],
['Calcium role','Lowers mash pH, protects against oxalate haze, aids coagulation, reduces tannin extraction.'],
['Sulfate effect','Accentuates bitterness and dryness (Burton).'],
['Chloride effect','Accentuates fullness and sweetness; high levels hamper flocculation.'],
['Pilsen water','Very soft; Czech Premium Pale Lager.'],
['Burton water','Very high calcium and sulfate; crisp pale British bitters.'],
['Dublin water','Carbonate-rich; roasted stouts.'],
['Burtonizing','Add gypsum and Epsom salt.'],
['Chlorine and chloramine','Must be removed; they cause medicinal chlorophenol off-flavors.'],
['Lactose','Unfermentable by brewer\'s yeast; used in Sweet Stout.'],
['Unmalted wheat use','Witbier and Lambic.'],
['Lactobacillus','Lactic sourness; Berliner Weisse; Pediococcus/Lactobacillus can also make diacetyl.']
].forEach(c=>F('process',c[0],c[1]));
// Judging
[
['Evaluation order','Sniff immediately, appearance, flavor and mouthfeel, then re-check aroma and score overall impression.'],
['Time per entry','About 10 minutes including consensus.'],
['Scoring errors to avoid','Central scoring, extreme scoring, halo effect, proximity error, drift.'],
['Five basic tastes','Sweet, sour, salty, bitter, umami.'],
['Palate cleansers at the table','Water, plain bread or unsalted crackers only.']
].forEach(c=>F('judging',c[0],c[1]));
