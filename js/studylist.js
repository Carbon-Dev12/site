const games = [
  { title: "Slope", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/slope", img: "study-resources/img/slope4.jpeg" },
  { title: "Slope 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/slope-2/", img: "study-resources/img/slope-2-logo.png" },
  { title: "Stickman Hook", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stickman-hook/", img: "study-resources/img/stickman-hook.jpg" },
  { title: "Vex 3", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/vex-3/", img: "study-resources/img/vex3.png" },
  { title: "Space Company", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/space-company/", img: "study-resources/img/SpaceCompanyFavicon.png" },
  { title: "Tiny Fishing", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/tiny-fishing/", img: "study-resources/img/tiny-fishing.png" },
  { title: "Paper.io 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/paperio2/", img: "study-resources/img/paperio2.png" },
  { title: "Krunker.io", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/krunker/", img: "study-resources/img/krunker-io.jpg" },
  { title: "N-gon", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/n-gon/", img: "study-resources/img/n-gonbot.png" },
  { title: "Knife Master", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/knife-master/", img: "study-resources/img/knife-master.jpg" },
  { title: "The Heist", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/theheist/", img: "study-resources/img/theheist.jpg" },
  { title: "The Hotel", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/the-hotel/", img: "study-resources/img/the-hotel.png" },
  { title: "Tiny Islands", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/tiny-islands/", img: "study-resources/img/tiny-islands.png" },
  { title: "Elastic Man", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/elasticman/", img: "study-resources/img/elasticman.jpg" },
  { title: "Drive Mad", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/drive-mad/", img: "study-resources/img/drive-mad.jpg" },
  { title: "Shellshockers", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/shellshockers/", img: "study-resources/img/shellshockers.png" },
  { title: "Ns-Shaft", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/ns-shaft/", img: "study-resources/img/ns-shaft.png" },
  { title: "Win The Whitehouse", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/win-the-whitehouse/", img: "study-resources/img/win-the-whitehouse.png" },
  { title: "Surviv", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/surviv/", img: "study-resources/img/surviv.io.png" },
  { title: "Stack", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stack/", img: "study-resources/img/stack.jpg" },
  { title: "Starve", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/starve/", img: "study-resources/img/starve.png" },
  { title: "Rolly Vortex", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/rolly-vortex/", img: "study-resources/img/rolly-vortex.png" },
  { title: "Poly Branch", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/polybranch/", img: "study-resources/img/poly-branch.png" },
  { title: "Flappy Bird", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/flappy-bird/", img: "study-resources/img/flappy-bird.png" },
  { title: "Geometry Dash", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/geodash-lite/", img: "study-resources/img/geo-dash.png" },
  { title: "The Final Earth", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/the-final-earth/", img: "study-resources/img/the-final-earth.png" },
  { title: "Stick War", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stickwar/", img: "study-resources/img/stickwar.jpg" },
  { title: "Stick Archers", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stick-archers/", img: "study-resources/img/stick-archers.jpg" },
  { title: "Solitaire", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/solitaire/", img: "study-resources/img/solitaire.png" },
  { title: "Sort The Court", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/sort-the-court/", img: "study-resources/img/sort-the-court.png" },
  { title: "Sleeping Beauty", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/sleepingbeauty/", img: "study-resources/img/sleeping-bueaty.png" },
  { title: "Rooftop Snipers", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/rooftop-snipers/", img: "study-resources/img/rooftop-snipers.png" },
  { title: "Rolling Forests", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/rolling-forests/", img: "study-resources/img/rolling-forest.png" },
  { title: "Retro Bowl", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/retro-bowl/", img: "study-resources/img/retro-bowl.jpg" },
  { title: "Papas Pizzaria", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/papaspizzaria/", img: "study-resources/img/papaspizzaria.jpg" },
  { title: "Papery Planes", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/papery-planes/", img: "study-resources/img/papery-planes.jpg" },
  { title: "NS Resurgence", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/nsresurgence/", img: "study-resources/img/ns-resurgence.png" },
  { title: "My Rusty Submarine", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/my-rusty-submarine/", img: "study-resources/img/my-rusty-submarine.png" },
  { title: "Minesweeper", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/minesweeper/", img: "study-resources/img/minesweeper.png" },
  { title: "Learn To Fly", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/learntofly/", img: "study-resources/img/learntofly.png" },
  { title: "Learn To Fly 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/learntofly2/", img: "study-resources/img/learn-to-fly-2.jpg" },
  { title: "Just Fall", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/just-fall/", img: "study-resources/img/just-fall.png" },
  { title: "Just One Boss", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/just-one-boss/", img: "study-resources/img/just-one-boss.png" },
  { title: "Hextris", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/hextris/", img: "study-resources/img/hextris.png" },
  { title: "Frying Nemo", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/frying-nemo/", img: "study-resources/img/frying-nemo.png" },
  { title: "Glass City", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/glass-city/", img: "study-resources/img/glass-city.png" },
  { title: "Drift Boss", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/drift-boss/", img: "study-resources/img/drift-boss.png" },
  { title: "Cluster Rush", iframeUrl: "iframe.html?url=https://iisilly1059.github.io/cluster-rush2/", img: "study-resources/img/cluster-rush.png" },
  { title: "Bitlife", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bitlife/", img: "study-resources/img/bit-life.png" },
  { title: "Angry Sharks", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/angry-sharks/", img: "study-resources/img/angry-sharks.png" },
  { title: "Death Run 3d", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/death-run-3d/", img: "study-resources/img/death-run-3d.png" },
  { title: "Cube Field", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/cubefield/", img: "study-resources/img/cube-field.png" },
  { title: "Creative Kill Chamber", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/creativekillchamber/", img: "study-resources/img/creativekillchamber.jpg" },
  { title: "Circlo", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/circlo/", img: "study-resources/img/circlo.png" },
  { title: "Chill Radio", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/chill-radio/", img: "study-resources/img/chill-radio.png" },
  { title: "Boxing Random", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/boxing-random/", img: "study-resources/img/boxing-random.jpg" },
  { title: "Breaking The Bank", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/breakingthebank/", img: "study-resources/img/breakingthebank.png" },
  { title: "Boxhead 2 player", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/boxhead2play/", img: "study-resources/img/boxhead2play.jpg" },
  { title: "Black Knight", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/blackknight/", img: "study-resources/img/blackknight.png" },
  { title: "Bloonstd", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bloonstd/", img: "study-resources/img/bloonstd.jpg" },
  { title: "Bloonstd 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bloonstd2/", img: "study-resources/img/bloonstd2.png" },
  { title: "Bloxors", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bloxors/", img: "study-resources/img/bloxors.png" },
  { title: "Core Ball", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/core-ball/", img: "study-resources/img/core-ball.png" },
  { title: "Champion Archer", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/championarcher/", img: "study-resources/img/championarcher.png" },
  { title: "Cell Machine", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/cell-machine/", img: "study-resources/img/cell-machine.png" },
  { title: "Astray", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/astray/", img: "study-resources/img/astray.png" },
  { title: "Amidst The Clouds", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/amidst-the-clouds/", img: "study-resources/img/amidst-the-clouds.png" },
  { title: "Achievement Unlocked", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/achievementunlocked/", img: "study-resources/img/achievementunlocked.png" },
  { title: "A Dance Of Fire And Ice", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/a-dance-of-fire-and-ice/", img: "study-resources/img/a-dance-of-fire-and-ice.png" },
  { title: "Blackhole Square", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/blackholesquare/", img: "study-resources/img/blackhole-square.png" },
  { title: "Ovo", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/ovo/", img: "study-resources/img/ovo3.png" },
  { title: "Temple Run 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/temple-run-2/", img: "study-resources/img/temple-run.png" },
  { title: "Subway Surfers", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/subway-surfers/", img: "study-resources/img/subway-surfers.jpg" },
  { title: "10 Minutes Till Dawn", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/10-minutes-till-dawn/", img: "study-resources/img/10-minutes-till-dawn.png" },
  { title: "100ng", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/100ng/", img: "study-resources/img/100ng.png" },
  { title: "A Dark Room", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/adarkroom/", img: "study-resources/img/a-dark-room.png" },
  { title: "Chrome Dino", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/chrome-dino/", img: "study-resources/img/chrome-dino.png" },
  { title: "Riddle School 1", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/riddleschool/", img: "study-resources/img/riddleschool.png" },
  { title: "Riddle School 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/riddleschool2/", img: "study-resources/img/riddleschool2.png" },
  { title: "Riddle School 3", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/riddleschool3/", img: "study-resources/img/riddleschool3.png" },
  { title: "Riddle School 4", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/riddleschool4/", img: "study-resources/img/riddleschool4.png" },
  { title: "Riddle School 5", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/riddleschool5/", img: "study-resources/img/riddleschool5.png" },
  { title: "Vex 4", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/vex4/", img: "study-resources/img/vex4.png" },
  { title: "Vex 5", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/vex5/", img: "study-resources/img/vex5.jpeg" },
  { title: "Vex 6", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/vex6/", img: "study-resources/img/vex6.jpeg" },
  { title: "Vex 7", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/vex7/", img: "study-resources/img/vex7.jpeg" },
  { title: "Stick Duel Battle", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stick-duel-battle/", img: "study-resources/img/stick-duel-battle.jpg" },
  { title: "Stickman Merge", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stick-merge/", img: "study-resources/img/stickman-merge.png" },
  { title: "Stickman Boost", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stickman-boost/", img: "study-resources/img/stickman-boost.png" },
  { title: "Stickman Golf", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stickman-golf/", img: "study-resources/img/stickman-golf.png" },
  { title: "Stickman Survival", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/Stickman-Survival/", img: "study-resources/img/stickman-survival.png" },
  { title: "Crossy Road", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/crossyroad/", img: "study-resources/img/crossyroad.png" },
  { title: "Cut The Rope", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/ctr", img: "study-resources/img/ctr.png" },
  { title: "Cut The Rope Xmas", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/ctr-holiday/", img: "study-resources/img/ctr-xmas.webp" },
  { title: "Getaway Shootout", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/getaway-shootout/", img: "study-resources/img/gateaway-shootout.jpg" },
  { title: "Google Snake", iframeUrl: "https://studythemes.com/study-resources/assets/google-snake/", img: "study-resources/img/google-snake.png" },
  { title: "Jetpack Joyride", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/jetpack-joyride/", img: "study-resources/img/jetpack-joyride.jpg" },
  { title: "Motox3m", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/motox3m/", img: "study-resources/img/motox3m.jpg" },
  { title: "Motox3m Pool", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/motox3m-pool/", img: "study-resources/img/motox3m-pool.jpg" },
  { title: "Motox3m Spooky", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/motox3m-spooky/", img: "study-resources/img/motox3m-spooky.jpeg" },
  { title: "Motox3m Winter", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/motox3m-winter/", img: "study-resources/img/motox3m-winter.jpeg" },
  { title: "Om Nom Bounce", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/om-bounce/", img: "study-resources/img/om-bounce.jpeg" },
  { title: "Cookie Clicker", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/cookie-clicker/", img: "study-resources/img/cookie-clicker.png" },
  { title: "Doodle Jump", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/doodle-jump/", img: "study-resources/img/doodle.png" },
  { title: "Evolution", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/evolution/", img: "study-resources/img/evolution.png" },
  { title: "Friday Night Funkin'", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/fridaynightfunkin/", img: "study-resources/img/friday-night-funkin'.jpg" },
  { title: "Froggy's Battle", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/froggys-battle/", img: "study-resources/img/froggy's-battle.jpg" },
  { title: "George And The Printer", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/georgeandtheprinter/", img: "study-resources/img/george-and-the-printer.png" },
  { title: "Game Inside", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/game-inside/", img: "study-resources/img/game-inside.png" },
  { title: "Gimme The Airpod", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/gimme-the-airpod/", img: "study-resources/img/gimme-the-airpod.png" },
  { title: "Go Ball", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/go-ball/", img: "study-resources/img/go-ball.jpg" },
  { title: "Good Night", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/goodnight/", img: "study-resources/img/good-night.jpg" },
  { title: "Google Feud", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/google-feud/", img: "study-resources/img/google-feud.png" },
  { title: "Gravity Soccer", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/gravity-soccer/", img: "study-resources/img/gravity-soccer.png" },
  { title: "Grey Box", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/greybox/", img: "study-resources/img/grey-box.png" },
  { title: "Noob Steve Parkour", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/noob-steve-parkour/", img: "study-resources/img/noob-steave-parkour.png" },
  { title: "Offline Paradise", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/Offlineparadise/", img: "study-resources/img/offline-paradise.jpeg" },
  { title: "Pandemic 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/pandemic2/", img: "study-resources/img/pandemic2.png" },
  { title: "Papas Burgeria", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/papasburgeria/", img: "study-resources/img/papas-burgeria.jpg" },
  { title: "Pixel Gun Survival", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/pixel-gun-survival/", img: "study-resources/img/pixel-gun-survival.jpg" },
  { title: "Portal Flash", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/portalflash/", img: "study-resources/img/portal-flash.jpg" },
  { title: "Precision Client", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/precision-client/", img: "study-resources/img/precision-client.png" },
  { title: "Protektor", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/protektor/", img: "study-resources/img/protektor.jpg" },
  { title: "Bad Ice Cream", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bad-ice-cream/", img: "study-resources/img/bad-ice-cream.png" },
  { title: "Bad Ice Cream 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bad-ice-cream-2/", img: "study-resources/img/bad-ice-cream-2.png" },
  { title: "Bad Ice Cream 3", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/bad-ice-cream-3/", img: "study-resources/img/bad-ice-cream-3.png" },
  { title: "Baldis Basics", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/baldis-basics/", img: "study-resources/img/baldis-basics.png" },
  { title: "Ballistic Chickens", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/ballistic-chickens/", img: "study-resources/img/ballistic-chickens.png" },
  { title: "Basketball Stars", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/basketball-stars/", img: "study-resources/img/basketball-stars.png" },
  { title: "Basket Bros", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/basketbros-io/", img: "study-resources/img/basket-bros.jpg" },
  { title: "Basket Random", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/basket-random/", img: "study-resources/img/basket-random.jpeg" },
  { title: "Operius", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/operius/", img: "study-resources/img/operius.png" },
  { title: "Aqua Park Slides", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/aquapark-slides/", img: "study-resources/img/aquapark-slides.png" },
  { title: "Stack Bump 3D", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/stack-bump-3d/", img: "study-resources/img/stack-bump-3d.jpg" },
  { title: "Station 141", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/station-141/", img: "study-resources/img/station-141.png" },
  { title: "Super Hot", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/superhot/", img: "study-resources/img/super-hot.jpg" },
  { title: "Sushi Unroll", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/sushi-unroll/", img: "study-resources/img/sushi-unroll.png" },
  { title: "Swerve", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/swerve/", img: "study-resources/img/swerve.jpg" },
  { title: "Synesthesia", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/synesthesia/", img: "study-resources/img/synesthesia.png" },
  { title: "Tactical Assassin 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/tacticalassasin2/", img: "study-resources/img/tacticalassasin2.png" },
  { title: "Tactical Weapon Pack 2", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/tactical-weapon-pack-2/", img: "study-resources/img/tactical-weapon-pack-2.jpg" },
  { title: "Tank Trouble", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/tank-trouble-2/", img: "study-resources/img/tank-trouble.jpeg" },
  { title: "Poly Track", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/poly-track/", img: "study-resources/img/poly-track.png" },
  { title: "Partical Clicker", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/partical-clicker/", img: "study-resources/img/partical-clicker.png" },
  { title: "Cut The Rope Time Travel", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/ctr-tr", img: "study-resources/img/ctr-tr.png" },
  { title: "Crazy Chicken 3D", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/crazy-chicken/", img: "study-resources/img/crazy-chicken.png" },
  { title: "Re Run", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/rerun/", img: "study-resources/img/rerun.png" },
  { title: "Nazi Zombies Portable", iframeUrl: "iframe.html?url=https://studythemes.com/study-resources/assets/nazi-zombies/", img: "study-resources/img/nazi-zombies.png" }
];

function createGameBox(game) {
  const box = document.createElement("div");
  box.className = "game-box";
  box.dataset.url = game.iframeUrl;
  box.dataset.title = game.title;
  box.dataset.img = game.img;

  const img = document.createElement("img");
  img.src = game.img;
  img.alt = game.title;
  img.loading = "lazy";

  const titleDiv = document.createElement("div");
  titleDiv.className = "game-title";
  titleDiv.textContent = game.title;

  const favoriteBtn = document.createElement("div");
  favoriteBtn.className = "favorite-btn";
  favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';

  box.appendChild(img);
  box.appendChild(titleDiv);
  box.appendChild(favoriteBtn);

  return box;
}

function renderGames(containerId = "games-container") {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = ""; // Clear any existing content

  let currentRow = null;

  games.forEach((game, index) => {
    if (index % 5 === 0) {
      currentRow = document.createElement("div");
      currentRow.className = "five-box-row";
      container.appendChild(currentRow);
    }

    currentRow.appendChild(createGameBox(game));
  });
}

// Run when the page loads
document.addEventListener("DOMContentLoaded", () => renderGames());
// At the very end of games-list.js, after renderGames()
document.addEventListener("DOMContentLoaded", () => {
  renderGames();
  
  // Re-attach click handlers (replace with your actual function name)
  attachGameClickHandlers();  // <-- whatever your function is called
});