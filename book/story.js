// Final text and layout data for every page. Art lives in pages/pNN.js.
// {{fist}} {{v}} {{palm}} become small drawn hand icons.
'use strict';
const go = t => `<p class="goto">${t}</p>`;
const big = t => `<p class="call">${t}</p>`;
const AIKO = 'All the same? Shout <b>AIKO DESHO!</b> and throw again.';

module.exports = {
  title: 'Guu, Choki, Paa and the Ninja on the Roof',
  subtitle: 'A janken adventure — you choose the way',
  imprint: 'Minedscape Media',
  pages: [
    { n: 1, name: 'Title', density: 'OPEN', artH: 850, frame: false,
      text: `<p class="sub">A janken adventure — you choose the way</p>` },
    { n: 2, name: 'Meet the brothers', density: 'MEDIUM', artH: 560, frame: false,
      text: `<p>Meet the brothers. They are triplets, they are small, and they are going to be ninjas one day.</p>
<p class="who">{{fist}} <b>GUU</b> is strong. Guu is a rock. <span class="say">Say “goo.”</span></p>
<p class="who">{{v}} <b>CHOKI</b> is quick. Choki is scissors. <span class="say">Say “CHO-kee.”</span></p>
<p class="who">{{palm}} <b>PAA</b> is kind. Paa is paper. <span class="say">Say “pah.”</span></p>` },
    { n: 3, name: 'How to play', density: 'OPEN', artH: 520, frame: false,
      text: `<p class="head">HOW TO PLAY JANKEN</p>
<p class="center">Rock breaks scissors. Scissors cut paper. Paper wraps rock.</p>
<p>When the brothers must choose, they throw. <b>You throw too</b> — against a friend. The hand that wins picks the page.</p>
<p>Playing alone? Close your eyes and throw one hand. That hand picks the page.</p>
<p class="small">${AIKO} <span class="say">Say “eye-ko deh-show.”</span></p>` },
    { n: 4, name: 'The hood', density: 'MEDIUM',
      text: `<p>High in the pine tree above the three dojos — the ninja schools — something black was caught on a branch.</p>
<p>A ninja hood. A real one.</p>
<p>“Somebody lost this,” said Paa.<br>“Somebody wants it back,” said Guu.<br>“So let’s find them,” said Choki.</p>` },
    { n: 5, name: 'The wind-up', density: 'MEDIUM',
      text: `<p>Guu tucked the hood in his belt.</p>
<p>Three dojos. One lost hood. Which way first?</p>
<p>The brothers put out their fists.</p>${big('“JAN — KEN —”')}` },
    { n: 6, name: 'Jan-ken-po! First choice', density: 'OPEN', artH: 520, frame: false,
      throwBlock: [
        ['fist', 'GUU', 7, '<b>The Tiger Dojo.</b> It sounds like thunder in there.'],
        ['v', 'CHOKI', 13, '<b>The Crane Dojo.</b> It makes no sound at all.'],
        ['palm', 'PAA', 19, '<b>The Turtle Dojo.</b> It is warm and slow.']] },

    // Tiger
    { n: 7, name: 'Tiger: arrival', density: 'OPEN', icon: 'fist',
      text: `<p>The Tiger Dojo shook with STOMP! STOMP! STOMP!</p><p>Guu grinned. “This one sounds like me.”</p>` },
    { n: 8, name: 'Tiger: caught', density: 'BUSY', icon: 'fist',
      text: `<p>“Little ninjas! No one enters the Tiger Dojo without passing the <b>Test of Strength</b>.”</p>` },
    { n: 9, name: 'Tiger: the task', density: 'MEDIUM', icon: 'fist',
      text: `<p>“Move the barrel across the room,” said the student. “Then you may search.”</p>` },
    { n: 10, name: 'Tiger: the turn', density: 'OPEN', icon: 'fist',
      text: `<p>Guu pushed. And pushed. The barrel did not move one bit.</p>` },
    { n: 11, name: 'Tiger: the solve', density: 'BUSY', icon: 'fist',
      text: `<p>Choki cut a rope. Paa laid down staffs to roll on. Guu pulled — and the barrel rolled clean across the floor!</p>` },
    { n: 12, name: 'Tiger: the clue', density: 'MEDIUM', icon: 'fist',
      text: `<p>“Strong AND clever,” said the student. “Here — I found this thread on the roof of the Great Hall last night.”</p>${go('Tuck the thread in your pocket and go to page <b>25</b>.')}` },

    // Crane
    { n: 13, name: 'Crane: arrival', density: 'OPEN', icon: 'v',
      text: `<p>The Crane Dojo made no sound at all.</p><p>Choki put two fingers up like ears. “This one is mine.”</p>` },
    { n: 14, name: 'Crane: caught', density: 'BUSY', icon: 'v',
      text: `<p>“Little ninjas. No one crosses the Crane Dojo floor without passing the <b>Test of Speed</b>.”</p>` },
    { n: 15, name: 'Crane: the task', density: 'MEDIUM', icon: 'v',
      text: `<p>“Cross the room without being touched,” she said. “Then you may search.”</p>` },
    { n: 16, name: 'Crane: the turn', density: 'OPEN', icon: 'v',
      text: `<p>Choki ran his fastest. WHAP! The pole caught him and sat him right down.</p>` },
    { n: 17, name: 'Crane: the solve', density: 'BUSY', icon: 'v',
      text: `<p>Guu blocked the pole with his shoulder. Paa counted — one, two, THREE — GO! And Choki slipped through like a shadow.</p>` },
    { n: 18, name: 'Crane: the clue', density: 'MEDIUM', icon: 'v',
      text: `<p>“Quick AND together,” she said. “Someone left this on the roof of the Great Hall last night. Take it.”</p>${go('Fold the crane into your pocket and go to page <b>25</b>.')}` },

    // Turtle
    { n: 19, name: 'Turtle: arrival', density: 'OPEN', icon: 'palm',
      text: `<p>The Turtle Dojo was warm and slow.</p><p>Paa smiled. “This one feels like me.”</p>` },
    { n: 20, name: 'Turtle: caught', density: 'BUSY', icon: 'palm',
      text: `<p>“Little ninjas,” said the old sensei, without getting up. “No one may search the Turtle Dojo without passing the <b>Test of Patience</b>.”</p>` },
    { n: 21, name: 'Turtle: the task', density: 'MEDIUM', icon: 'palm',
      text: `<p>“Hold this bowl. Do not spill one drop. When the sparrow comes to drink, you may search.”</p>` },
    { n: 22, name: 'Turtle: the turn', density: 'OPEN', icon: 'palm',
      text: `<p>Paa waited. And waited. His nose itched, his arms shook — SLOSH! went the water.</p>` },
    { n: 23, name: 'Turtle: the solve', density: 'BUSY', icon: 'palm',
      text: `<p>Guu held up Paa’s arms. Choki scratched the itch. Paa did not move one bit — and the little sparrow came down to drink.</p>` },
    { n: 24, name: 'Turtle: the clue', density: 'MEDIUM', icon: 'palm',
      text: `<p>“Still AND together,” said the sensei. “I found this bell on the roof of the Great Hall last night. Take it.”</p>${go('Ring the bell once and go to page <b>25</b>.')}` },

    // Converge
    { n: 25, name: 'What did you find?', density: 'MEDIUM',
      text: `<p>Out in the alley, the brothers looked at what they had.</p><p><b>In Paa’s hands, draw the thing you found. Then color it in.</b></p>${go('Then turn to page <b>26</b>.')}` },
    { n: 26, name: 'Three clues, one roof', density: 'BUSY',
      text: `<p>Thread, crane, or bell — all three came from the same place. The brothers waited until the moon came up.</p>
<p>High on the roof of the Great Hall, something moved.</p><p>“A ninja,” whispered Guu. “A real one.”</p>${go('They started to climb. Turn to page <b>27</b>.')}` },

    // Roof
    { n: 27, name: 'Jan-ken-po! Second choice', density: 'OPEN', artH: 430,
      pre: `<p>At the edge of the roof the tiles were steep and slippery. Only one could lead.</p>${big('“JAN — KEN — PO!”')}`,
      throwBlock: [
        ['fist', 'GUU', 28, 'Guu goes first — straight up the steep side.'],
        ['v', 'CHOKI', 29, 'Choki goes first — along the very top.'],
        ['palm', 'PAA', 30, 'Paa goes first — the slow way round.']] },
    { n: 28, name: 'Guu leads', density: 'BUSY', icon: 'fist',
      text: `<p>Guu went first. He crawled straight up the steep side, slow and heavy, and his brothers held on tight. A tile slipped loose — CLACK, CLACK, CLACK — all the way down.</p>${go('The masked ninja turned around. Go to page <b>31</b>.')}` },
    { n: 29, name: 'Choki leads', density: 'BUSY', icon: 'v',
      text: `<p>Choki went first. He ran along the very top of the roof, quick and light — until a cat shot out from behind the chimney. MEOW!</p>${go('The masked ninja turned around. Go to page <b>31</b>.')}` },
    { n: 30, name: 'Paa leads', density: 'BUSY', icon: 'palm',
      text: `<p>Paa went first. He found the flat way round the edge and showed his brothers where to step. Safe, but slow — and the dust tickled his nose. ACHOO!</p>${go('The masked ninja turned around. Go to page <b>31</b>.')}` },

    // Ending
    { n: 31, name: 'Face to face', density: 'BUSY', artH: 440,
      pre: `<p>The ninja pulled down her mask. It was a girl — no bigger than a broom, wobbling on one leg. “I practice up here,” she said. “Where nobody laughs.”</p>
<p>“We won’t laugh,” said Paa. “We can’t even reach the top shelf.” Guu pulled the lost hood from his belt. <b>Who gives it back?</b></p>`,
      throwBlock: [
        ['fist', 'GUU', 32, 'Look at picture 1.'],
        ['v', 'CHOKI', 32, 'Look at picture 2.'],
        ['palm', 'PAA', 32, 'Look at picture 3.']] },
    { n: 32, name: 'Three endings', density: 'MEDIUM', artH: 800, frame: false,
      text: `<p class="head">And that is how the four of them met.</p>${go('Play again? Go back to page <b>5</b> and throw a different hand.')}` },
  ],
  AIKO,
};
