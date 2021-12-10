:-dynamic driverduty/3.
:-dynamic agenda/2.
:-dynamic disponibilidade/3.
:-dynamic equilibrio/3.
:-dynamic duty/1.


:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic perc_passagem/1.
:-dynamic endTime/1.
:-dynamic startTIme/1.
:-dynamic avalInput/1.
:-dynamic stabil/1.
:-dynamic pop_estabilidade/1.
:-dynamic count_estabilidade/1.
:-dynamic workblocks/1.
:-dynamic agenda/4.
:-dynamic lista_motoristas_nworkblocks/2.
:-dynamic counter/2.


workblock(1,[437, 198, 238],26580,29100).
workblock(2,[439, 92],27300,29160).
workblock(3,[441, 348, 349],27300,30120).
workblock(4,[443, 278, 313],27900,30420).
workblock(5,[445, 93],28200,30060).
workblock(6,[447, 350, 389],28500,31320).
workblock(7,[449, 168, 183],28740,31920).
workblock(8,[451, 94],29100,30960).
workblock(9,[453, 279, 314],29220,31740).
workblock(10,[455, 351, 390],29700,32520).
workblock(11,[457, 95],30000,31860).
workblock(12,[459, 29, 61],34080,37620).
workblock(13,[461, 46, 79],63780,67320).
workblock(14,[463, 128],67800,69660).
workblock(15,[465, 130],69600,71460).
workblock(16,[238, 280],29100,31200).
workblock(17,[280, 315],31200,33060).
workblock(18,[315, 283],33060,35160).
workblock(19,[283, 318],35160,37020).
workblock(20,[318, 286],37020,39120).
workblock(21,[286, 321],39120,40980).
workblock(22,[321, 289],40980,43080).
workblock(23,[289, 324],43080,44940).
workblock(24,[324, 292],44940,47040).
workblock(25,[292, 327],47040,48900).
workblock(26,[327, 295],48900,51000).
workblock(27,[295, 330],51000,52860).
workblock(28,[330, 298],52860,54960).
workblock(29,[298, 333],54960,56820).
workblock(30,[333, 301],56820,58920).
workblock(31,[301, 336],58920,60780).
workblock(32,[336, 304],60780,62880).
workblock(33,[304, 339],62880,64740).
workblock(34,[339, 307],64740,66840).
workblock(35,[307, 342],66840,68700).
workblock(36,[342, 310],68700,70800).
workblock(37,[310, 345],70800,72660).
workblock(38,[345, 438],72660,73320).
workblock(39,[101],29160,31020).
workblock(40,[96, 105],31020,34500).
workblock(41,[100],34500,36360).
workblock(42,[109],36360,40020).
workblock(43,[112, 141],40020,43500).
workblock(44,[],43500,45420).
workblock(45,[115, 144],45420,48900).
workblock(46,[],48900,50820).
workblock(47,[118, 147],50820,54300).
workblock(48,[],54300,56220).
workblock(49,[121, 150],56220,59700).
workblock(50,[],59700,62100).
workblock(51,[434, 78],62100,65520).
workblock(52,[47, 81],65520,69120).
workblock(53,[51, 85],69120,72720).
workblock(54,[55, 433],72720,76320).
workblock(55,[440],76320,76440).
workblock(56,[349, 352, 391],30120,33720).
workblock(57,[391, 355, 394],33720,37320).
workblock(58,[394, 358, 397],37320,40920).
workblock(59,[397, 361, 400],40920,44520).
workblock(60,[400, 364, 403],44520,48120).
workblock(61,[403, 367, 406],48120,51720).
workblock(62,[406, 370, 409],51720,55320).
workblock(63,[409, 373, 412],55320,58920).
workblock(64,[412, 376, 415],58920,62520).
workblock(65,[415, 379, 418],62520,66120).
workblock(66,[418, 382, 421],66120,69720).
workblock(67,[421, 385, 424],69720,73320).
workblock(68,[424, 388, 427],73320,76920).
workblock(69,[427, 442],76920,77460).
workblock(70,[313, 281],30420,32520).
workblock(71,[281, 316],32520,34380).
workblock(72,[316, 284],34380,36480).
workblock(73,[284, 319],36480,38340).
workblock(74,[319, 287],38340,40440).
workblock(75,[287, 322],40440,42300).
workblock(76,[322, 290],42300,44400).
workblock(77,[290, 325],44400,46260).
workblock(78,[325, 293],46260,48360).
workblock(79,[293, 328],48360,50220).
workblock(80,[328, 296],50220,52320).
workblock(81,[296, 331],52320,54180).
workblock(82,[331, 299],54180,56280).
workblock(83,[299, 334],56280,58140).
workblock(84,[334, 302],58140,60240).
workblock(85,[302, 337],60240,62100).
workblock(86,[337, 305],62100,64200).
workblock(87,[305, 340],64200,66060).
workblock(88,[340, 308],66060,68160).
workblock(89,[308, 343],68160,70020).
workblock(90,[343, 311],70020,72120).
workblock(91,[311, 346],72120,73980).
workblock(92,[346, 444],73980,74640).
workblock(93,[102],30060,31920).
workblock(94,[97, 106],31920,35400).
workblock(95,[30, 62],35400,39420).
workblock(96,[32, 64],39420,43020).
workblock(97,[34, 66],43020,46620).
workblock(98,[36, 68],46620,50220).
workblock(99,[38, 70],50220,53820).
workblock(100,[40, 72],53820,57420).
workblock(101,[42, 74],57420,61020).
workblock(102,[44, 76],61020,64620).
workblock(103,[435, 80],64620,68220).
workblock(104,[50, 84],68220,71820).
workblock(105,[54, 88],71820,75420).
workblock(106,[57, 87],75420,79020).
workblock(107,[58, 89],79020,82620).
workblock(108,[59, 90],82620,86220).
workblock(109,[60, 91],86220,89820).
workblock(110,[446],89820,89940).
workblock(111,[389, 353, 392],31320,34920).
workblock(112,[392, 356, 395],34920,38520).
workblock(113,[395, 359, 398],38520,42120).
workblock(114,[398, 362, 401],42120,45720).
workblock(115,[401, 365, 404],45720,49320).
workblock(116,[404, 368, 407],49320,52920).
workblock(117,[407, 371, 410],52920,56520).
workblock(118,[410, 374, 413],56520,60120).
workblock(119,[413, 377, 416],60120,63720).
workblock(120,[416, 380, 419],63720,67320).
workblock(121,[419, 383, 422],67320,70920).
workblock(122,[422, 386, 425],70920,74520).
workblock(123,[425, 448],74520,75060).
workblock(124,[169, 184],31920,35520).
workblock(125,[170, 185],35520,39120).
workblock(126,[171, 186],39120,42720).
workblock(127,[172, 187],42720,46320).
workblock(128,[173, 188],46320,49920).
workblock(129,[174, 189],49920,53520).
workblock(130,[175, 190],53520,57120).
workblock(131,[176, 191],57120,60720).
workblock(132,[177, 192],60720,64320).
workblock(133,[178, 193],64320,67920).
workblock(134,[179, 194],67920,71520).
workblock(135,[180, 195],71520,75120).
workblock(136,[181, 196],75120,78720).
workblock(137,[182, 197],78720,82320).
workblock(138,[450],82320,82440).
workblock(139,[103],30960,32820).
workblock(140,[98, 107],32820,36300).
workblock(141,[110],36300,38160).
workblock(142,[139],38160,41820).
workblock(143,[113, 142],41820,45300).
workblock(144,[],45300,47220).
workblock(145,[116, 145],47220,50700).
workblock(146,[],50700,52620).
workblock(147,[119, 148],52620,56100).
workblock(148,[],56100,58020).
workblock(149,[122, 151],58020,61500).
workblock(150,[124],61500,63360).
workblock(151,[153],63360,65220).
workblock(152,[126, 155],65220,68700).
workblock(153,[129],68700,70560).
workblock(154,[158],70560,72420).
workblock(155,[133, 162],72420,75900).
workblock(156,[452],75900,76020).
workblock(157,[314, 282],31740,33840).
workblock(158,[282, 317],33840,35700).
workblock(159,[317, 285],35700,37800).
workblock(160,[285, 320],37800,39660).
workblock(161,[320, 288],39660,41760).
workblock(162,[288, 323],41760,43620).
workblock(163,[323, 291],43620,45720).
workblock(164,[291, 326],45720,47580).
workblock(165,[326, 294],47580,49680).
workblock(166,[294, 329],49680,51540).
workblock(167,[329, 297],51540,53640).
workblock(168,[297, 332],53640,55500).
workblock(169,[332, 300],55500,57600).
workblock(170,[300, 335],57600,59460).
workblock(171,[335, 303],59460,61560).
workblock(172,[303, 338],61560,63420).
workblock(173,[338, 306],63420,65520).
workblock(174,[306, 341],65520,67380).
workblock(175,[341, 309],67380,69480).
workblock(176,[309, 344],69480,71340).
workblock(177,[344, 312],71340,73440).
workblock(178,[312, 347],73440,75300).
workblock(179,[347, 454],75300,75960).
workblock(180,[390, 354, 393],32520,36120).
workblock(181,[393, 357, 396],36120,39720).
workblock(182,[396, 360, 399],39720,43320).
workblock(183,[399, 363, 402],43320,46920).
workblock(184,[402, 366, 405],46920,50520).
workblock(185,[405, 369, 408],50520,54120).
workblock(186,[408, 372, 411],54120,57720).
workblock(187,[411, 375, 414],57720,61320).
workblock(188,[414, 378, 417],61320,64920).
workblock(189,[417, 381, 420],64920,68520).
workblock(190,[420, 384, 423],68520,72120).
workblock(191,[423, 387, 426],72120,75720).
workblock(192,[426, 456],75720,76260).
workblock(193,[104],31860,33720).
workblock(194,[99, 108],33720,37200).
workblock(195,[111],37200,39960).
workblock(196,[140],39960,43620).
workblock(197,[114, 143],43620,47100).
workblock(198,[],47100,49020).
workblock(199,[117, 146],49020,52500).
workblock(200,[],52500,54420).
workblock(201,[120, 149],54420,57900).
workblock(202,[],57900,59820).
workblock(203,[123, 152],59820,63300).
workblock(204,[125],63300,65160).
workblock(205,[154],65160,67020).
workblock(206,[127, 156],67020,70500).
workblock(207,[131],70500,72360).
workblock(208,[160],72360,74220).
workblock(209,[135, 164],74220,77700).
workblock(210,[458],77700,77820).
workblock(211,[31, 63],37620,41220).
workblock(212,[33, 65],41220,44820).
workblock(213,[35, 67],44820,48420).
workblock(214,[37, 69],48420,52020).
workblock(215,[39, 71],52020,55620).
workblock(216,[41, 73],55620,59220).
workblock(217,[43, 75],59220,62820).
workblock(218,[45, 77],62820,66420).
workblock(219,[48, 82],66420,70020).
workblock(220,[52, 86],70020,73620).
workblock(221,[56, 432],73620,77220).
workblock(222,[460],77220,77340).
workblock(223,[49, 83],67320,70920).
workblock(224,[53, 436],70920,74520).
workblock(225,[462],74520,74640).
workblock(226,[157],69660,71520).
workblock(227,[132, 161],71520,75000).
workblock(228,[136],75000,76860).
workblock(229,[165],76860,78720).
workblock(230,[137, 166],78720,82200).
workblock(231,[138],82200,84060).
workblock(232,[167, 464],84060,85920).
workblock(233,[159],71460,73320).
workblock(234,[134, 163],73320,76800).
workblock(235,[466],76800,76920).

vehicleduty(1,[1, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]).
vehicleduty(2,[2, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55]).
vehicleduty(3,[3, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69]).
vehicleduty(4,[4, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92]).
vehicleduty(5,[5, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110]).
vehicleduty(6,[6, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]).
vehicleduty(7,[7, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138]).
vehicleduty(8,[8, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156]).
vehicleduty(9,[9, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179]).
vehicleduty(10,[10, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192]).
vehicleduty(11,[11, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210]).
vehicleduty(12,[12, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222]).
vehicleduty(13,[13, 223, 224, 225]).
vehicleduty(14,[14, 226, 227, 228, 229, 230, 231, 232]).
vehicleduty(15,[15, 233, 234, 235]).


equilibrio(276, [6,2], []).
equilibrio(5188, [4,4], []).
equilibrio(16690, [6,2], []).
equilibrio(18107, [8], []).

%-------------------------

valoresGeneticos:-
	write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Percentagem de passagem para a prÃ³xima geraÃ§Ã£o (20% ou 30%):'), read(P3),
	PP is P3/100,
	(retract(perc_passagem(_));true), asserta(perc_passagem(PP)),
	write('Tempo limite de execuÃ§Ã£o:'), read(TT),
	(retract(endTime(_));true), asserta(endTime(TT)),
	get_time(TI),
	(retract(startTIme(_));true), asserta(startTIme(TI)),
	write('AvaliaÃ§Ã£o mÃ­nima para conclusÃ£o:'), read(AMIN),
	(retract(avalInput(_));true), asserta(avalInput(AMIN)),
	write('NÃºmero de geraÃ§Ãµes idÃªnticas para estabilizaÃ§Ã£o:'), read(STABVAL),
	(retract(stabil(_));true), asserta(stabil(STABVAL)).


startAll:-
	(retractall(driverduty(_,_,_));true),
	valoresGeneticos,
	findall(V,vehicleduty(V,_), VV),
	startAll(VV).

startAll([]):-!.

startAll([V|V1]):-
	(retract(duty(_));true), asserta(duty(V)),
	geraDirect(NN),
	nl,write("Vehicle Duty "),write(V),nl,
	write("Geracoes: "),write(NN),nl,
	reverse(NN,NN1),
	vehicleduty(V, LL),
	sequenciaValida(NN1, LL, N),
	write("Sequenciamento:"),write(N),nl,
	remove_duplicates(N, LM),
	updateDriverDuties(LM,N,LL),
	startAll(V1).


sequenciaValida([], _, []).

sequenciaValida([X|[]], LL, N):- sequenciaValidaGen(X, LL, N).

sequenciaValida([X,1|_], LL, N):- sequenciaValidaGen(X, LL, N).

sequenciaValida([_,1|Y], LL, N):- sequenciaValida(Y, LL, N).


sequenciaValidaGen([], _, _):- false.

sequenciaValidaGen([X*_|_], LL, X):-
		validateSeq(X, LL),
			duty(VD),
		remove_duplicates(X, LM),
		validateSeq2(LM, X, VD),
		updateEquilibrio(LM, X, VD),!.

sequenciaValidaGen([_*_|Y], LL, N):- sequenciaValidaGen(Y,LL,N).


validateSeq([], []):- !, true.

validateSeq([A|B], [C|D]):-
		workblock(C,_,BS,BE),
		findall((A,S,E),(disponibilidade(A,S,E), S=<BS, BE=<E),L),
		length(L, Len),Len>0,validateSeq(B,D).

validateSeq2([], _, _):- !, true.

%validateSeq2([A|B], X, VD):-
		%equilibrio(A, S, T),
		%length(S,NS),length(T,NT),
		%NS>=NT,
		%getBalanceamentoVals(VD,S,T,RS,RT),
		%count(X, A, Count),
		%RF = RT + Count,RS >= RF,
		%validateSeq2(B,X,VD).

validateSeq2([A|B], X, VD):-
		equilibrio(A, S, T),
		length(S,NS),length(T,NT),NS>NT,
		proximoEquilibrio(S,T,RS),
		count(X, A, Count),
		RS >= Count,validateSeq2(B,X,VD).

% getBalanceamentoVals(_,[],[],_,_):- !, false.

% getBalanceamentoVals(VD,[RS|_],[(VD,RT)|_],RS,RT):- !.

%  getBalanceamentoVals(VD,[_|S2],[_|T2],RS,RT):-
% getBalanceamentoVals(VD,S2,T2,RS,RT).

proximoEquilibrio([R|_],[],R):- !.

proximoEquilibrio([_|S2],[_|T2],RS):- proximoEquilibrio(S2,T2,RS).

updateEquilibrio([], _, _):- !.

updateEquilibrio([A|B], X, VD):-
		equilibrio(A, S, T),
		count(X, A, Count),
		scu(T, Count, VD, T1),
		retract(equilibrio(A, S, T)),
		assert(equilibrio(A, S, T1)),
		updateEquilibrio(B,X,VD).

scu([], Count, VD, [(VD,Count)]).

scu([(VD,TA)|TB], Count, VD, [(VD,TC)|TB]):- TC is TA + Count.

scu([TA|TB], Count, VD, [TA|TB1]):- scu(TB,Count,VD,TB1).

count([],_,0).
count([X|T],X,Y):- count(T,X,Z), Y is 1+Z.
count([X1|T],X,Z):- X1\=X,count(T,X,Z).





updateDriverDuties([],_,_).



updateDriverDuties([X|Y],N,LL):-
	(driverduty(X,WbsAssociados,_);WbsAssociados=[]),setupDD(X,N,LL,DD),
	append(WbsAssociados,DD,DDF),
	findall(W,(order_by([asc(S)],workblock(W,_,S,_)), member(W,DDF)),DDFF),
	remove_duplicates(DDFF, DD1),
	getAgendas2(DD1),penalizacao(V),
	correcaoDriverDuties(DD1, V, N, DD2, N1, NY),
	append(Y, NY, NNY),
	remove_duplicates(NNY, Y1),
	getAgendas2(DD2),
	penalizacao(V2),
	sumV(V,TV),sumV(V2,TV2)	,
	((TV2<TV, (retract(driverduty(X,_,_));true), assert(driverduty(X,DD2,V2)), YFinal = Y1, NFinal = N1)
	;
	((retract(driverduty(X,_,_));true), assert(driverduty(X,DD1,V)), YFinal = Y, NFinal = N)),
	updateDriverDuties(YFinal,NFinal,LL).



remove_duplicates([],[]).

remove_duplicates([H | T], List) :-
     member(H, T),
     remove_duplicates( T, List).

remove_duplicates([H | T], [H|T1]) :-
      \+member(H, T),
      remove_duplicates( T, T1).

sumV([],V):- V is 0.

sumV([X|Y],V):- sumV(Y,V1), V is V1 + X.


setupDD(_,[],[],[]):-!.

setupDD(M,[M|N],[O|P],[O|ResDD]):- setupDD(M,N,P,ResDD).

setupDD(X,[_|N],[_|P],DD):- setupDD(X,N,P,DD).




penalizacao(V):-
	findall((S,E),agenda(S,E),Ag1),
	bsortA(Ag1,Ag),
	newavalia1(Ag, 0, V1),
	newavalia2(Ag, 0, V2),
	newavalia3(Ag, V3),
	newavalia4(Ag, 0, V4),
	V = [V1,V2,V3,V4].


newavalia1([], 1 , V):- V is  8*3600.

newavalia1([], _ , 0).

newavalia1([(B,C)|_], _, V):-
	B < 39600, C > 54000,
	newavalia1([], 1, V).


newavalia1([(_,C)|D], T, V):-
	C < 39600,
	newavalia1(D, T, V).

newavalia1([(_,C)|D], T, V):-
	C > 54000,
	newavalia1(D, T, V).

newavalia1([(_,C)|D], T, V):-
	C > 39600, C < 54000,
	newavalia11(D, C, T, V).

newavalia11([], _, T, V):- newavalia1([], T, V).

newavalia11([(_,_)|[]], _, T, V):- newavalia1([], T, V).

newavalia11([(B,C)|D], U, T, V):-
	U1 is B-U,
	U1 < 3600,
	((T==0, T1=1);(T1=T)),
	newavalia1([(B,C)|D], T1, V).

newavalia11([(B,C)|D], _, T, V):-
	T1 is T + 1,
	newavalia1([(B,C)|D], T1, V).





newavalia2([], 1 , V):- V is  8*3600.

newavalia2([], _ , 0).

newavalia2([(B,C)|_], _, V):-
	B < 64800, C > 79200,
	newavalia2([], 1, V).

newavalia2([(_,C)|D], T, V):-
	C < 64800,
	newavalia2(D, T, V).

newavalia2([(_,C)|D], T, V):-
	C > 79200,
	newavalia2(D, T, V).

newavalia2([(_,C)|D], T, V):-
	C > 64800, C < 79200,
	newavalia22(D, C, T, V).

newavalia22([], _, T, V):- newavalia2([], T, V).

newavalia22([(_,_)|[]], _, T, V):- newavalia2([], T, V).

newavalia22([(B,C)|D], U, T, V):-
	U1 is B-U,
	U1 < 3600,
	newavalia2([(B,C)|D], T, V).

newavalia22([(B,C)|D], _, T, V):-
	T1 is T + 1,
	newavalia2([(B,C)|D], T1, V).





newavalia3([], 0):- !.

newavalia3([(B,C)|D], V):-
	Temp is C-B,
	Temp > 14400, !,
	NewTemp is Temp - 14400,
	V1 is NewTemp * 10,
	newavalia35(D, C, V2),
	newavalia3(D, V3),
	V is V1 + V2 + V3.

newavalia3([(_,_)|D], V):-
	newavalia3(D,V).

newavalia35([], _, 0):- !.

newavalia35([(_,C)|_], Z, V):-
	Temp is Z-C,
	Temp <3600,
	V is 3600*10.

newavalia35([(_,_)|_], _, 0).



newavalia4([], T, V):- T<28800, V is 0.

newavalia4([], T, V):- !,Temp is T-28800, V is Temp*10.

newavalia4([(B,C)|D], T, V):-
	Temp is C-B + T,
	newavalia4(D, Temp, V).


setAgendas2([]):- !.

setAgendas2([Block, Block2|ResB]):-
	workblock(Block,_,_,A),
	workblock(Block2,_,A,_),
	setSequencial2(Block, Block2, ResB).

setSequencial2(Block, Block2, []):-
	workblock(Block,_,Start,_),
	workblock(Block2,_,_,End),
	assert(agenda(Start,End)).

setSequencial2(Block, Block2, [Block3|ResB]):-
	workblock(Block2,_,_,A),
	workblock(Block3,_,A,_),
	setSequencial2(Block, Block3, ResB).

setSequencial2(Block, Block2, [Block3|ResB]):-
	workblock(Block,_,Start,_),
	workblock(Block2,_,_,End),
	assert(agenda(Start,End)),
	setAgendas2([Block3|ResB]).

setAgendas2([Block|ResB]):-
	workblock(Block,_,Start,End),
	assert(agenda(Start,End)),
	setAgendas2(ResB).


getAgendas2(L):-
	retractall(agenda(_,_)),
	setAgendas2(L).


correcaoDriverDuties(DD1, [A,B,C,D], N, DD2, N1, NY):-
	findall((M,S,E),(workblock(M,_,S,E), member(M,DD1), 39600=<S, E=<54000),Alm),
	correct1(A, Alm, DD1, N, DD11, N11, NY1),
	findall((M,S,E),(workblock(M,_,S,E), member(M,DD11), 64800=<S, E=<79200),Jan),
	correct1(B, Jan, DD11, N11, DD12, N12, NY2),
	append(NY1, NY2, NY12),
	findall((S,E),(workblock(M,_,S,E), member(M,DD12)),[(X,Y)|Z]),
	Temp is Y-X,
	correct3(C, [(X,Y)|Z], DD12, N12, DD13, N13, NY3, Temp),
	append(NY12,NY3, NY123),
	findall((S,E),(workblock(M,_,S,E), member(M,DD13)),KN),
	correct4(D, KN, DD13, N13, DD2, N1, NY4, 0),
	append(NY123,NY4, NY).

correct1(0, _, DD1, N, DD1, N, []).

correct1(_, [], DD1, N, DD1, N, []).

correct1(_, Alm, DD1, N, DD11, N1, NY1):- !,
	escolherBlocos(Alm, Bls, 0),
	replaceCor1(Bls,DD1,DD11,N,N1,NY1).

correct1(_, _, DD1, N, DD1, N, []).


escolherBlocos([], _, _):- false.

escolherBlocos([(X,Y,Z)|_], [X], T):-
	Temp is T + Z-Y,
	Temp >= 3600.

escolherBlocos([(X,Y,Z)|W], [X|Res], T):-
	Temp is T + Z-Y,
	escolherBlocos(W, Res, Temp).


replaceCor1([],DD1,DD1,N,N,[]):- !.

replaceCor1([X|Y],DD1,DD11,N,N1,[NY11|NY12]):-
	findReplacement1(X,DD1,DD111,N,N11,NY11),
	replaceCor1(Y,DD111,DD11,N11,N1,NY12).


correct3(0, _, DD1, N, DD1, N, [], _).

correct3(_, [], DD1, N, DD1, N, [], _):- !.

correct3(_, [_|[]], DD1, N, DD1, N, [], _):- !.

correct3(CN, [(_,B),(B,C)|D], [M,R|L], N, [M|L1], N1, [Rep|NY], T):-
	Temp is T + C-B,
	Temp > 14400, !,
	findReplacement(B,C,Rep,N,N11, R),
	correct3(CN, D, L, N11, L1, N1, NY, 0).

correct3(CN, [(_,B),(B,C)|D], [M,R|L], N, [M|L1], N1, NY, T):-
	Temp is T + C-B,
	correct3(CN, [(B,C)|D], [R|L], N, L1, N1, NY, Temp).

correct3(CN, [(_,_),(P,C)|D], [M,R|L], N, [M|L1], N1, NY, _):-
	Temp is C-P,
	correct3(CN, [(P,C)|D], [R|L], N, L1, N1, NY, Temp).



correct4(0, _, DD1, N, DD1, N, [], _).

correct4(_, [], [], _, [], _, [], _).

correct4(D4, [(A,B)|C], [M|R], N, [M|R1], N1, NY, T):-
	Temp is T+ B-A,
	Temp<28800,
	correct4(D4, C,R,N,R1,N1,NY,Temp).

correct4(_, [(A,B)|C], [M|R], N, [], N1, NY, _):-
	redistribute([(A,B)|C], [M|R], N, N1, NY).


redistribute([], [], N, N, []).

redistribute([(A,B)|C], [M|R], N, N1, [Rep|NY]):-
	findReplacement(A,B,Rep,N,N11, M),
	redistribute(C,R,N11,N1, NY).

redistribute([(_,_)|C], [_|R], N, N1, NY):-
	redistribute(C,R,N,N1, NY).



findReplacement(B,C,Rep,N,N11,R):-
	duty(NVD),
	vehicleduty(NVD, LB),
	nth1(SRN, LB, R),
	nth1(SRN, N, No),
	findall(M,(disponibilidade(M,S,E), S=<B, C=<E, M\==No),LL),
	length(LL, Len),
	Len>0,
	Len1 is Len +1,
	random(1, Len1, Ch),
	nth1(Ch, LL, Rep),
	sAndR(N,N11,1,SRN,Rep).

findReplacement(_,_,_,_,_,_):- false.

findReplacement1(X,DD1,DD111,N,N11,Rep):-
	duty(NVD),
	vehicleduty(NVD, LB),
	nth1(SRN, LB, X),
	nth1(SRN, N, No),
	workblock(X,_,B,C),
	findall(M,(disponibilidade(M,S,E), S=<B, C=<E, M\==No),LL),
	length(LL, Len),
	Len1 is Len +1,
	random(1, Len1, Ch),
	nth1(Ch, LL, Rep),
	sAndR(N,N11,1,SRN,Rep),
	removeFromDuty(X,DD1,DD111).


sAndR([_|B],[Rep|B],NF,NF,Rep):-!.

sAndR([A|B],[A|C],N,NF,Rep):- N1 is N+1, sAndR(B,C,N1,NF,Rep).

removeFromDuty(_,[],[]).

removeFromDuty(X,[X|Y],Y):-!.

removeFromDuty(X,[Y|Z],[Y|Z1]):-removeFromDuty(X,Z,Z1).





updateDisponibilidades([]):-!, retractall(disponibilidade(_,A,A)).

updateDisponibilidades([(X,Y)|Z]):-
	updateDisp(X,Y),
	updateDisponibilidades(Z).


updateDisp(_,[]):-!.

updateDisp(X,[R|T]):-
	workblock(R,_,S,E),
	findall((A,B), (disponibilidade(X,A,B), S>=A, E=<B), [LB|_]),
	retractCutReplace(X,LB,S,E),
	updateDisp(X,T).


retractCutReplace(X,(A,B),S,E):-
	retract(disponibilidade(X,A,B)),
	assert(disponibilidade(X,A,S)),
	assert(disponibilidade(X,E,B)).


