-- English product texts, drafted from the current Lithuanian values (please review).
-- Matches on the Lithuanian text, so every product sharing a description or
-- flavour note gets the same translation. Safe to re-run.
-- Requires 0008_product_translations.sql.

update products p
set description_en = m.en
from (values
  ('Bekofeininių juodųjų arbatų rinkinys: vanilės, saldžios karamelės, šokolado ir lazdyno riešutų bei cinamono prieskonių – po 5 pakelius.', 'A selection of decaffeinated black teas: vanilla, sweet caramel, chocolate & hazelnut and cinnamon spice – 5 bags of each.'),
  ('Bekofeininė juodoji arbata su lengvu bergamotės prieskoniu – švelni, tinka vakarui.', 'Decaffeinated black tea with a light hint of bergamot – smooth and ideal for the evening.'),
  ('Bekofeininė žalioji arbata – švelni ir šviežia, tinka vakarui.', 'Decaffeinated green tea – smooth and fresh, ideal for the evening.'),
  ('Citrinų ir imbiero arbata be kofeino – šildanti, aštroka, gaivi.', 'Caffeine-free lemon and ginger tea – warming, gently spicy and refreshing.'),
  ('Citrusinių vaisių arbata be kofeino – gaivi, ryški, tinka karšta ir šalta.', 'Caffeine-free citrus fruit tea – fresh and vibrant, delicious hot or iced.'),
  ('Erškėtuogių, vyšnių ir hibiskų vaisinė arbata be kofeino – sodri, rausva, saldžiarūgštė.', 'Caffeine-free rosehip, cherry and hibiscus fruit tea – rich, ruby-red and sweet-tart.'),
  ('Indijos Himalajų papėdės juodoji arbata – lengva, gėlių aromato, vadinama „arbatų šampanu“.', 'Black tea from the Himalayan foothills of India – light and floral, known as “the champagne of teas”.'),
  ('Juodoji arbata su abrikosų aromatu – švelni, vaisinė, sodraus skonio.', 'Black tea with apricot flavour – smooth, fruity and full-bodied.'),
  ('Juodoji arbata su aviečių aromatu – uogų saldumas ir lengvas rūgštumas.', 'Black tea with raspberry flavour – berry sweetness with a light tartness.'),
  ('Juodoji arbata su braškių aromatu – saldi, vasariška, tinka karšta ir šalta.', 'Black tea with strawberry flavour – sweet and summery, delicious hot or iced.'),
  ('Juodoji arbata su chai prieskoniais – šilta, aromatinga, geriausia su pienu.', 'Black tea with chai spices – warm and aromatic, best with milk.'),
  ('Juodoji arbata su cinamonu – šilta, prieskoninė, puiki šaltuoju metų laiku.', 'Black tea with cinnamon – warm and spicy, perfect for the colder months.'),
  ('Juodoji arbata su citrinų ir žaliųjų citrinų aromatu – gaivi, citrusinė, puiki šalta.', 'Black tea with lemon and lime flavour – fresh and citrusy, excellent iced.'),
  ('Juodoji arbata su juodųjų serbentų aromatu – sodri, uogų skonio.', 'Black tea with blackcurrant flavour – rich, with a berry taste.'),
  ('Juodoji arbata su kardamonu – šilta, prieskoninė, egzotiška. Skanu su pienu ir cukrumi.', 'Black tea with cardamom – warm, spicy and exotic. Delicious with milk and sugar.'),
  ('Juodoji arbata su mangų aromatu – tropinė, saldi, gaivinanti.', 'Black tea with mango flavour – tropical, sweet and refreshing.'),
  ('Juodoji arbata su obuolių gabalėliais ir aromatu – saldi, vaisinė, tinka karšta ir šalta.', 'Black tea with apple pieces and flavour – sweet and fruity, delicious hot or iced.'),
  ('Juodoji arbata su persikų ir pasiflorų aromatu – egzotiška, gaivi, puikiai tinka šalta.', 'Black tea with peach and passion fruit flavour – exotic and fresh, excellent iced.'),
  ('Juodoji arbata su vanile, cinamonu ir obuoliais – lyg obuolių pyragas puodelyje.', 'Black tea with vanilla, cinnamon and apple – like apple pie in a cup.'),
  ('Juodoji arbata su vanilės aromatu – švelni, kreminė, jauki.', 'Black tea with vanilla flavour – smooth, creamy and comforting.'),
  ('Klasikinis tvirtas juodosios arbatos mišinys pusryčiams – sodrus, salyklinis skonis, puikiai dera su pienu.', 'A classic strong black tea blend for breakfast – rich and malty, pairs perfectly with milk.'),
  ('Klasikinių juodųjų arbatų rinkinys: English Breakfast, Earl Grey, English Tea No.1 ir Darjeeling – po 5 pakelius.', 'A selection of classic black teas: English Breakfast, Earl Grey, English Tea No.1 and Darjeeling – 5 bags of each.'),
  ('Klasikinė juodoji arbata su bergamotės aromatu – gaivi, citrusinė, tinka su citrina arba šalta.', 'Classic black tea with bergamot flavour – fresh and citrusy, enjoy with lemon or iced.'),
  ('Klasikinė kiniška žalioji arbata – švelni, šviežia, su lengvomis žolelių natomis.', 'Classic Chinese green tea – smooth and fresh, with light herbaceous notes.'),
  ('Mangų ir apelsinų vaisinė arbata be kofeino – tropinė, citrusinė, gaivi.', 'Caffeine-free mango and orange fruit tea – tropical, citrusy and refreshing.'),
  ('Melisų žolelių arbata be kofeino – švelni, citrinų aromato, raminanti.', 'Caffeine-free lemon balm herbal tea – gentle, lemony and calming.'),
  ('Mėlynių ir cinamono vaisinė arbata be kofeino – uogų saldumas su šiltu prieskoniu.', 'Caffeine-free blueberry and cinnamon fruit tea – berry sweetness with a warm spice.'),
  ('Persikų ir aviečių vaisinė arbata be kofeino – saldi, vaisinė, puiki šalta.', 'Caffeine-free peach and raspberry fruit tea – sweet and fruity, excellent iced.'),
  ('Pipirmėčių ir citrinų žolelių arbata be kofeino – gaivi, vėsinanti, puiki po valgio.', 'Caffeine-free peppermint and lemon herbal tea – fresh and cooling, perfect after a meal.'),
  ('Ramunėlių arbata su medaus ir vanilės aromatu be kofeino – saldi, jauki, raminanti.', 'Caffeine-free chamomile tea with honey and vanilla flavour – sweet, comforting and calming.'),
  ('Ramunėlių ir citrinžolės žolelių arbata be kofeino – švelni, rami, su lengvu citrusų gaivumu.', 'Caffeine-free chamomile and lemongrass herbal tea – gentle and soothing, with a light citrus freshness.'),
  ('Rooibos arbata su cinamonu be kofeino – natūraliai saldi, šilta ir jauki.', 'Caffeine-free rooibos with cinnamon – naturally sweet, warm and comforting.'),
  ('Subalansuotas juodosios arbatos mišinys su subtiliu bergamotės prieskoniu – tinka bet kuriuo dienos metu.', 'A balanced black tea blend with a subtle hint of bergamot – suits any time of day.'),
  ('Uogų ir hibiskų vaisinė arbata be kofeino – sodri, saldžiarūgštė, puiki šalta.', 'Caffeine-free berry and hibiscus fruit tea – rich and sweet-tart, excellent iced.'),
  ('Vaisinių juodųjų arbatų rinkinys: obuolių, persikų ir pasiflorų, citrinų ir žaliųjų citrinų bei braškių – po 5 pakelius.', 'A selection of fruity black teas: apple, peach & passion fruit, lemon & lime and strawberry – 5 bags of each.'),
  ('Šri Lankos juodoji arbata – gaivi, gyvybinga, su lengvomis citrusų natomis. Tinka su citrina ar pienu.', 'Sri Lankan black tea – fresh and lively, with light citrus notes. Enjoy with lemon or milk.'),
  ('Švelni žalioji arbata su natūraliu citrinos aromatu.', 'Smooth green tea with natural lemon flavour.'),
  ('Žalioji arbata su avietėmis ir granatais – uogų saldumas su gaiviu rūgštumu.', 'Green tea with raspberry and pomegranate – berry sweetness with a refreshing tartness.'),
  ('Žalioji arbata su citrinų aromatu – gaivi, citrusinė, tinka karšta ir šalta.', 'Green tea with lemon flavour – fresh and citrusy, delicious hot or iced.'),
  ('Žalioji arbata su jazminų žiedais – švelni, gėlių aromato, raminanti.', 'Green tea with jasmine blossoms – smooth, floral and calming.'),
  ('Žalioji arbata su mangų ir ličių aromatu – tropinė, saldi, puiki šalta.', 'Green tea with mango and lychee flavour – tropical and sweet, excellent iced.'),
  ('Žalioji arbata su mėtų lapeliais – gaivi, vėsinanti, puiki po valgio.', 'Green tea with mint leaves – fresh and cooling, perfect after a meal.'),
  ('Žaliosios arbatos ir žolelių mišinys su citrina, mate, matcha ir cinku – gaivus, mėtų ir citrusų natų.', 'A green tea and herbal blend with lemon, mate, matcha and zinc – refreshing, with mint and citrus notes.'),
  ('Žaliųjų arbatų rinkinys – klasikinė, jazminų, mėtų ir citrinų skonių žalioji arbata viename dėžutėje.', 'A selection of green teas – classic, jasmine, mint and lemon green tea in one box.'),
  ('Žemuogių vaisinė arbata be kofeino – saldi, vasariška, tinka karšta ir šalta.', 'Caffeine-free wild strawberry fruit tea – sweet and summery, delicious hot or iced.'),
  ('Žolelių arbata be kofeino su citrinžole, imbieru, ciberžole ir vitaminu C – šildanti, citrusinė.', 'Caffeine-free herbal tea with lemongrass, ginger, turmeric and vitamin C – warming and citrusy.'),
  ('Žolelių arbata be kofeino su persikais, saldžiąja pupmedžio vaisių (karobos) nata, rožių žiedlapiais ir alavijais.', 'Caffeine-free herbal tea with peach, a sweet note of carob, rose petals and aloe vera.'),
  ('Žolelių arbata be kofeino su pipirmėtėmis, šaltmėtėmis, pankoliais, ramunėlėmis ir saldymedžiu.', 'Caffeine-free herbal tea with peppermint, spearmint, fennel, chamomile and liquorice.'),
  ('Žolelių arbata be kofeino su ramunėlėmis, medumi, levandomis ir pasiflora – švelni, raminanti.', 'Caffeine-free herbal tea with chamomile, honey, lavender and passionflower – gentle and calming.'),
  ('Žolelių arbata su greipfrutais, mate ir guaranos sėklomis (turi kofeino) bei vitaminu B6 – gaivi, citrusinė.', 'Herbal tea with grapefruit, mate and guarana seeds (contains caffeine) and vitamin B6 – fresh and citrusy.'),
  ('Žolelių mišinys be kofeino – lengvas, gaivus, tinka bet kuriuo dienos metu.', 'A caffeine-free herbal blend – light and refreshing, suits any time of day.')
) as m(lt, en)
where p.description = m.lt;

-- Flavour notes are translated word by word, keeping their order;
-- a note without a translation is kept in Lithuanian.
with m(lt, en) as (values
  ('Abrikosų', 'Apricot'),
  ('Aviečių', 'Raspberry'),
  ('Bergamotė', 'Bergamot'),
  ('Braškių', 'Strawberry'),
  ('Cinamono', 'Cinnamon'),
  ('Citrusinė', 'Citrus'),
  ('Dūminė', 'Smoky'),
  ('Gaivi', 'Fresh'),
  ('Gėlių', 'Floral'),
  ('Imbiero', 'Ginger'),
  ('Karamelės', 'Caramel'),
  ('Kardamono', 'Cardamom'),
  ('Klasikinė', 'Classic'),
  ('Mangų', 'Mango'),
  ('Melisų', 'Lemon balm'),
  ('Mėlynių', 'Blueberry'),
  ('Mėtų', 'Mint'),
  ('Obuolių', 'Apple'),
  ('Persikų', 'Peach'),
  ('Prieskoninė', 'Spiced'),
  ('Ramunėlių', 'Chamomile'),
  ('Saldi', 'Sweet'),
  ('Salyklinė', 'Malty'),
  ('Serbentų', 'Blackcurrant'),
  ('Skanu šaltai', 'Great iced'),
  ('Subalansuota', 'Balanced'),
  ('Tvirta', 'Strong'),
  ('Uogų', 'Berry'),
  ('Vaisinė', 'Fruity'),
  ('Vanilės', 'Vanilla'),
  ('Vyšnių', 'Cherry'),
  ('Šokolado', 'Chocolate'),
  ('Švelni', 'Smooth'),
  ('Žolinė', 'Herbaceous')
)
update products p
set flavor_tags_en = (
  select array_agg(coalesce(m.en, u.tag) order by u.i)
  from unnest(p.flavor_tags) with ordinality as u(tag, i)
  left join m on m.lt = u.tag
)
where p.flavor_tags is not null;
