import { useEffect, useState } from "react";
import { getCountByMunicipioId } from "../service/PublicacaoService";
import { FaSpinner } from "react-icons/fa";


interface MunicipioData {
    id: number;
    path: string;
    stroke: string;
    count: number;
    nome: string;
  }
const MapaInterativo = () => {

    const [municipios, setMunicipios] = useState<MunicipioData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchMunicipiosData = async () => {
        try {
          // Array de objetos com informações sobre cada município
          const municipiosData: MunicipioData[] = [
            {
              id: 1, path: 'M268.5 511.5H264V510L262.5 506L259.5 498.5V489.5L263.5 483.5L261.5 480L263.5 477L266.5 480V482L282 480V453L279 448L280 445.5H290L292.5 441.5L291.5 434.5L267.5 423.5V421.5L269 418V415.5L273.5 412L274.5 402L283 394H283.5L286 389.5V387L269 376L268 368L270.5 365.5V350L268.5 347.5L265.5 339V334.5L269.5 330L271 327L271.5 314.5L272 312L273.5 309.5L275.5 307.5L279.5 307L281 304L283.5 302L285.5 301.5L287 300.5L289 296L292 292.5L296 289L299 287L300.5 284.5V283.5L299 282.5H296L293 280H290L289 281.5H284L280 284.5L273.5 286L268.5 285.5L266 287.5H259V284L261.5 280L262.5 277.5V271L267.5 269H272.5L281 262.5L284.5 258.5L290.5 255.5L292.5 249.5L293.5 244.5L292.5 239.5L293.5 232.5L295 231.5H299L300 230L298 227.5L295 224.5L294.5 221L290.5 219.5V218L294.5 213L295 211.5L292.5 209.5L289 208.5L286.5 205L285.5 204V202.5L287 201.5V199L283 196.5V193L285 189L283 187.5L279.5 188L279 189.5V191L274 190.5L272 188H269L268.5 190.5V192.5L267.5 194L267 193.5L263 189.5L259.5 179L258.5 170.5L251.5 163V162.5V160.5L252 159.5L252.5 156L252 154.5L251 152.5L250.5 151.5L250 150L251 148L252 147.5L259.5 147L261.5 145.5L264.5 144.5L266.5 145L268.5 148H276L277.5 145.5L280 144.5L283 144L286.5 139.5L289 138H291.5L295 139H306.5L321.5 148L324.5 151L325 153V156L333 163H340.5L342 158.5L344.5 157H346.5L351.5 160.5L356 164.5L358.5 167.5L361 168.5L364.5 168L368.5 166L372 164.5H378.5L380.5 163L381 161L381.5 159.5L383 159L386 159.5L388 159L388.5 157V155L389 152L391 148.5L393.5 147L395.5 146.5L396 146L397 145L397.5 144L396 142.5V140L396.5 138L397.5 137H400.5L403 136.5L404.5 135.5L406.5 133.5L408.5 131L410.5 129L412 128.5L417 129.5L417.5 128L419 126.5L422 125L424 123L427 119L428.5 118H431L437 121.5H439V127L434 131V137.5L431.5 141.5L426.5 144V152L420 156L419.5 167.5L418.5 170.5L419 172L418.5 180.5L416 185L417.5 188.5L419 192.5L421 197L422 200.5L422.5 205L422 209L421 211L422 215.5L424 220H426L431 219L436 213.5L443 207L451 202.5L459 200L464.5 199.5L484.5 202.5H500L503.5 199L506 197.5L513 198L520 195L522.5 196L523.5 199V201L520.5 202V205L522.5 207L526.5 204L531.5 203.5L536 201L537 197L540 197.5L550.5 217.5L549 221.5V222H545L541.5 225L540 225.5L536.5 232.5L534 234H531.5V238L533 243L535 244.5L534 247.5L531.5 249L532 254.5L539.5 257L540 259L539.5 261.5L542.5 264.5L542 267H538V268.5L538.5 270.5L541.5 272.5V274.5L538 279.5L537.5 282L530.5 283.5L529 285.5V289.5L530 291L527 295.5L522 299L524 303L516 308.5L513.5 312L509 307.5L506 310H486.5L484 308.5L480.5 308L474.5 297.5H471V298.5H458.5L449.5 291.5H439L437 290.5L434 288.5L433 285H429.5L425 288H420L416 285L412 281.5H409L409.5 285.5L410 287.5V291.5L407 297.5L409 301.5V304L407 307V310.5L406.5 312.5L404.5 314.5L396.5 319.5L388.5 323L385 320.5L381.5 324H379L378 325L375 336L374.5 340L372.5 342.5V345L377.5 350L384 355.5L385 357.5L384 359.5L376 364L370 369H368L364.5 370.5V373.5L366 376L366.5 379L366 381L364.5 383L365 384.5L368 388L372.5 392L376 395.5L379.5 401L383 407V414L382 416.5V428L381 430.5L376 436.5L375 442.5L374.5 448.5L375 451.5L377 452.5L382.5 456L384.5 458.5L386 467L387 471.5L386 477L386.5 480L387 487L390 500L391 502.5L387.5 505.5V508L390 512L392 514V515.5L389.5 518.5L391 522.5V525.5L392 528.5L388.5 530.5L380.5 535L374.5 538L373 540L375 548L374.5 549.5L364 554L361 553.5L360 550L357.5 546.5L355.5 545.5L346.5 545L341.5 541.5L339.5 542L333.5 545L323 549.5L318 550L312 548.5H302.5L300.5 549.5L297 553.5L289.5 558L285.5 559L283 557.5L282.5 555L283 553L290 545.5L292.5 541L296 535V533.5L290 530.5L289.5 526.5L284 525L281 520L275.5 514.5L268.5 511.5Z', stroke: 'white', count: 0,
              nome: "São Paulo"
            }, // Substitua os dados aqui pelos seus paths e ids
            {
              id: 2, path: 'M368.5 369.5L365 371L370 373.5L373.5 375L378 375.5L381.5 375L384 378L386 376.5L389 375.5L392.5 371.5L393.5 366L397 361L403 356.5V354L403.5 352.5L411.5 344L411 339.5L411.5 334L412.5 332L411.5 330.5L409 331L405.5 333L403 334L400.5 333L398.5 329.5V326.5L398 325H395L392.5 327.5L391.5 329.5L390.5 329V326.5L389 323.5L385.5 321L383.5 323L382 324.5H379.5L378.5 325.5L376.5 333L375.5 336.5L375 340.5L373 343V345.5L375 347.5L378 350.5L384.5 356L385.5 358L384.5 360L376.5 364.5L370.5 369.5H368.5Z', stroke: 'white', count: 0,
              nome: "Diadema"
            },
            {
              id: 3, path: 'M511 434.5L518 429.5L514 426L509 425.5L507.5 423L509 421L507.5 419H500.5L492.5 410.5V408.5L489.5 406H486L482.5 399.5L478 398L477 394.5L474 393.5L467.5 386L463 382L459 379.5L457.5 380L457 382L448.5 383H445.5L444.5 382L445 380.5L446.5 380H448.5L450 379.5L450.5 377L450 374.5L451.5 371L452 366.5L450.5 362L450 358.5L450.5 353.5L448.5 352.5L447 351.5L444.5 352.5L440 349L438 346.5L437.5 342L426.5 338.639V325L422 320L421.5 319L421 318V314.5L416.5 318H414L412.5 316L412 313.5L407.5 311L407 313L405 315L397 320L389 323.5L389.5 324.5L390.5 326.5V329L391.5 329.5L392.5 327.5L395 325H398L398.5 326.5V329.5L400.5 333L403 334L405.5 333L409 331L411.5 330.5L412.5 332L411.5 334L411 339.5L411.5 344L403.5 352.5L403 354V356.5L397 361L393.5 366L392.5 371.5L389 375.5L386 376.5L384 378L381.5 375L378 375.5L373.5 375L368 372.5L365 371V374L366.5 376.5L367 379.5L366.5 381.5L365 383.5L365.5 385L368.5 388.5L372.5 392L376.5 396L380 401.5L383.5 407.5V410.5V414.5L382.5 417V421.5V428.5L381.5 431L376.5 437L375.5 443L375 449L375.5 452L377.5 453L383 456.5L385 459L385.5 461.5L386.5 467.5L387.5 472L386.5 477.5L387 480.5L387.5 487.5L389 494L390.5 500.5L391.5 503L388 506V508.5L390 512L392.5 514.5V516L390 519L391.5 523V525.5L392.5 529.5L396 528.5L405.5 528L413.5 522.5L416 518L418.5 517.5H422.5L437.5 502L440 501.5L447 495.5L448 492.5L448.5 490.5L460.5 488L470 477.5L474 476.5L483.5 466.5L484.5 461H488L494.5 453H499.5L502 447.5L501 446L502.5 441.5L499.5 439L501.5 435.5L506.5 434.5H511Z', stroke: 'white', count: 0,
              nome: "São Bernardo do Campo"
            },
            {
              id: 4, path: 'M433 285.5L434 289L433 292.5L429.5 294.5L433 299L429.5 304.5V312L428.5 313L427.5 314L426.5 315L425.5 314.5L425 313.5L424.5 313H423.5L420.5 314.5L418.5 316L416 318H413.5L412 316L411.5 313.5L408.5 312L407 311V307.5L409 304.5V302L407 298L410 292V288L409.5 286L409 282H412L416 285.5L420 288.5H425L429.5 285.5H433Z', stroke: 'white', count: 0,
              nome: "São Caetano do Sul"
            },
            {
              id: 5, path: 'M597 409.5L607.5 397.5L603 393L599 387L598.5 386.5L597 385L590.5 386L584.5 381L581.5 380V375L575.5 368.5L569.5 369.5L566 375L558.5 375.5L553.5 379L554 382.5L550.5 386L546.5 386.5L542.5 390L531.5 396.5L520.5 397L513.5 400.5L511.5 399L511 397L509.5 396L503 394.5L501.5 393.5L498.5 396.5H494L490.5 395L490 394L492 389.5L489.5 386.5V383.5L481.5 376L482.5 371.5L483 370L479 364.5L475.5 364L473 359L468.5 358V348.5L472.5 344.5L476 333.5L469.5 324.5H466L464.5 323L468.5 318L472 316.5L473 315L468.5 310L472 305L471.5 299H459L450 292H439.5L437.5 291L434.5 289L433.5 292.5L430 294.5L433.5 299L430 304.5V312L427 315L426 314.5L425 313H424L421 314.5V318L422 320L426.5 325V338.5L437.5 342L438 346.5L440 349L444.5 352.5L447 351.5L448.5 352.5L450.5 353.5L450 358.5L450.5 362L452 366.5L451.5 371L450 374.5L450.5 377L450 379.5L448.5 380H446.5L445 380.5L444.5 382L445.5 383H448.5L453.5 382.5L457 382L457.5 380L459 379.5L463 382L467.5 386L474 393.5L477 394.5L478 398L482.5 399.5L486 406H489.5L492.5 408.5V410.5L500.5 419H507.5L509 421L507.5 423L509 425.5L514 426L518 429.5L523.5 427.5H532L540.5 422.5L545 417L543 414.5L546 410.5L551 412L557 412.5L566.5 408.5L570 405L578 406L580.5 416.5L583 420L589.5 416L592 410.5L597 409.5Z', stroke: 'white', count: 0,
              nome: "Santo André"
            },
            {
              id: 6, path: 'M569 369L575 368L575.5 361.5L578 355V352.5L577.5 352L576.5 351L575.5 351.5L574.5 353.5H572L569.5 354L568 358.5L565 361H554.5L551 358.5L550 355L544.5 357L540 355.5L537 356.5L538 363.5L535.5 366.5L530.5 365.5L526 371L518 372.5L517.5 378L516 381.5L514 383.5L515.5 388.5L514 391.5L510 392.5L509 395.5L510.5 396.5L511 398.5L513 400L520 396.5L531 396L542 389.5L546 386L550 385.5L553.5 382L553 378.5L558 375L565.5 374.5L569 369Z', stroke: 'white', count: 0,
              nome: "Rio Grande da Serra"
            },
            {
              id: 7, path: 'M570 354.5L572.5 354V348L566 337.5L563 331L556.5 326.5V322.5L559.5 317.5V313L557.5 310L556 309L548.5 313L546.5 311.5L541.5 301.5L540 295H538L530 310.5L529.5 319.5L535 330L534 332.5L529 333L522 338.5H517.5L516 338L510.5 336L498 347.5L497.5 350.5L493 354L489 354.5L486 359L481.5 360L479 364.5L483 370L482.5 371.5L481.5 376L489.5 383.5V386.5L492 389.5L490 394L490.5 395L494 396.5H498.5L501.5 393.5L503 394.5L509.5 396L510.5 393L514.5 392L516 389L514.5 384L516.5 382L518 378.5L518.5 373L526.5 371.5L531 366L536 367L538.5 364L537.5 357L540.5 356L545 357.5L550.5 355.5L551.5 359L555 361.5H565.5L568.5 359L570 354.5Z', stroke: 'white', count: 0,
              nome: "Ribeirao Pires"
            },
            {
              id: 8, path: 'M527 295.5L530 291L535 291.5L537 292.5L537.5 294.5L529.5 310L529 319L534.5 329.5L533.5 332L528.5 332.5L521.5 338H517L510 335.5L497.5 347L497 350L492.5 353.5L488.5 354L485.5 358.5L481 359.5L478.5 364L475 363.5L472.5 358.5L468 357.5V348L472 344L475.5 333L469 324H465.5L464 322.5L468 317.5L471.5 316L472.5 314.5L468 309.5L471.5 305L471 299V297.5H474.5L480.5 308L484 308.5L486.5 310H506L509 307.5L513.5 312L516 308.5L524 303L522 299L527 295.5Z', stroke: 'white', count: 0,
              nome: "Mauá"
            },
            {
              id: 9, path: 'M545 222H548.5H549L549.5 225V232.5L556 238.5L557.5 246.5L556 249.5L557.5 253.5L556 257.5L559.5 262.5L557 269L552 270L548.5 285L539.5 294.5H537.5L537 292.5L535 291.5L530 291L529 289.5V285.5L530.5 283.5L537.5 282L538 279.5L539 278L541.5 274.5V272.5L538.5 270.5L538 268.5V267H542L542.5 264.5L539.5 261.5L540 259L539.5 257L532 254.5L531.5 249L534 247.5L535 244.5L533 243L532.5 241L531.5 238V234H534L536.5 232.5L540 225.5L541.5 225L545 222Z', stroke: 'white', count: 0,
              nome: "Ferraz de Vasconcelos"
            },
            {
              id: 10, path: 'M557.5 269.5L560 263H562L565.5 256.5L566.5 249L569.5 243L572.5 242L573.5 235.5L576 227.5L576.5 221L573.5 218.5V216.5L570 214.5L570.5 213L575.5 207.5L580 210H587.5L589.5 211.5H594L594.5 211L601.5 209L610 205L613.5 205.5L615.5 208.5L617 214.5V217.5L614.5 221.5L614 225L617 232.5L616.5 237L613.5 244.5L608.5 246L606.5 247V255.5L604 258.5V261.5L617 283.5L619 290L618 296L617 300.5L620.5 307.5L621.5 313.5V319.5L620 331.5L615.5 339.5L595.5 353V362.5L584.5 381L581.5 380V375L575.5 368.5L576 362L578.5 355.5V353L577 351.5L576 352L575 354H572.5V348L566 337.5L563 331L556.5 326.5V322.5L559.5 317.5V313L557.5 310L556 309L548.5 313L546.5 311.5L541.5 301.5L540 295L549 285.5L550 281.5L552.5 270.5L557.5 269.5Z', stroke: 'white', count: 0,
              nome: "Suzano"
            },
            {
              id: 11, path: 'M576 220.5L573 218L571.5 219.5L562.5 221L559.5 218L554 221.5H549L549.5 225V232.5L556 238.5L557.5 246.5L556 249.5L557.5 253.5L556 257.5L559.5 262.5H561.5L565 256L566 248.5L569 242.5L572 241.5L573 235L575.5 227L576 220.5Z', stroke: 'white', count: 0,
              nome: "Poá"
            },
            {
              id: 12, path: 'M589 211H593.5L594 210.5L594.5 205.5L596 203.5H599.5L605 200.5L604.5 196L603.5 191L602 189V187L607 183.5L608 180L610.5 178V168.5L608 170H599L587.5 163L586 159L583.5 158L580.5 163.5L570 164L566.5 163L565.5 162.5L560.5 160L553.5 165.5V166.5L555 168L555.5 170.5L553.5 172L551.5 170.5L548.5 171.5L541 168.5L536 172L537.5 176L535 178H530.5L529 179.5L537 197L540 197.5L550.5 217.5L549 221.5H554L559.5 218L562.5 221L571.5 219.5L573 218V216L569.5 214L570 212.5L575 207L579.5 209.5H587L589 211Z', stroke: 'white', count: 0,
              nome: "Itaquaquecetuba"
            },
            {
              id: 13, path: 'M608 170L610.5 168.5L620 163L626.5 157.5V152.5L624.5 151H620L618.5 147L610 141L606 132.5L601.5 124L597 122L596.5 119.5L598.5 117V109.5L597 107.5L598.5 104.5V102.5L595 101.5L593.5 98L590.5 95.5L586 95L583 96L578 98L570.5 102L567.5 101.5L566.5 105L566 109L546.5 124.5L548 131L545.5 136.5L547.5 139.5L546.5 142.5L542 148L549 159L548.5 166L551.5 170.5L553.5 172L555.5 170.5L555 168L553.5 166.5V165.5L560.5 160L566.5 163L570 164L580.5 163.5L583.5 158L586 159L587.5 163L599 170H608Z', stroke: 'white', count: 0,
              nome: "Arujá"
            },
            {
              id: 14, path: 'M720 359L722 361.5L723 360L728 349.5L735 339.5L735.5 327.5L734 326.5L724.5 328H722L720.5 326.5L724 323V317.5L730 310V306L728 300V296L731 291.5L729.5 269.5L731 266L729.5 262.5L727 258L720 253L719.5 246.5L716 242.5L719 237L723.5 231L719.5 225L721.5 221.5L723.5 221H727L732 222.5H739V222L743 221.5L746 218L747.5 209.5L752.5 209L755.5 205.5L755 203L751 193.5L750.5 191.5L742.5 184L737 182.5L719 182L716 177L710 171L698 173.5L689.5 166.5L688 163.5L695 157.5V155L693.5 150.5L685.5 141.5L685 138L689 128L688 119.5L687.5 108H687L682.5 110.5V114L677.5 119.5H671L668.5 118L662.5 123L655 127L647 132.5L646.5 136.5L644.5 138L641 136.5L638 139.5L635.5 141L631.5 141.5V147L629 152L626.5 152.5V157.5L620 163L610.5 168.5V178L608 180L607 183.5L602 187V189L603.5 191L604.5 196L605 200.5L599.5 203.5H596L594.5 205.5L594 210.5L601 208.5L609.5 204.5L613 205L615 208L616.5 214V217L614 221L613.5 224.5L616.5 232L616 236.5L613 244L608 245.5L606 246.5V255L603.5 258V261L616.5 283L618.5 289.5L617.5 295.5L616.5 300L620 307L621 313.5V319L619.5 331L615 339L595 352.5V362L584 380.5L590 385.5L596.5 384.5L598.5 386.5L602.5 392.5L607 397L612.5 395L620.5 394.5L627 387.5L628 383.5L629 379.5L631 376.5L633 374.5L636 373.5L644.5 376L647 379.5H649L652.5 378.5L654 380L653 382.5L653.5 384L664 385.5L668 381L673 380.5L675 376.5L677.5 373.5L680.5 372L683.5 371L685.5 372.5H688.5L695 368L702.5 367.5L709 360L720 359Z', stroke: 'white', count: 0,
              nome: "Magi das Cruzes"
            },
            {
              id: 15, path: 'M842 333L843 327.5L838.5 319H831L830.5 314L833 310L831 305L819.5 304.5L817.5 302.5L817 301.5L832 289.5L833 288V278.5L831 271.5L811 267.5V250.5L808.5 242.5L801 243.5L798.5 242.5L798 239.5L800.5 236.5L796 227.5H788L783.5 232L777.5 235L768.5 231.5L767.5 232.5L763 240L756 240.5L752.5 243.5L745.5 240L740.5 239L739 234L741.5 230L738.5 225.5L739 222.5H732L727 221H723.5L721.5 221.5L719.5 225L723.5 231L719 237L716 242.5L719.5 246.5L720 253L727 258L729.5 262.5L731 266L729.5 269.5L730.5 284L731 291.5L728 296V300L730 306.5V310L724 317.5V323L720.5 326.5L722 328H725L734 326.5L735.5 327.5L735 339.5L728 349.5L722 362L722.5 364.5L724.5 368L722.5 369L721.5 371L722.5 373L724 374.5L728 373L731 372.5L735.5 373L740 371L744 369L746.5 366.5L754 363L757.5 362.5L760.5 364H767L790 353H793.5L803 347.5L806 346.5L810 347.5L812.5 347L816 345.5H818.5L820.5 347.5L819.5 349.5L820.5 351H832L840.5 345.5L841 342L839.5 339.5V337L842 333Z', stroke: 'white', count: 0,
              nome: "Biritiba Mirim"
            },
            {
              id: 16, path: 'M822.5 214L817 211.5L813.5 212.5L807 216L796 227.5L800.5 236.5L798 239.5L798.5 242.5L801 243.5L808.5 242.5L811 250.5V267.5L831 271.5L833 278.5V288L832 289.5L817 301.5L817.5 302.5L819.5 304.5L831 305L833 310L830.5 314L831 319H838.5L843 327.5L847 326.5L850 325.5L851.5 323L856.5 319L861.5 321L871.5 319L875.5 318.5L880.5 320L882.5 319V316.5L884.5 314L889 313L895.5 314L898.5 318.5V321.5L896 327.5L898 330.5L908 334L917 335.5L920.5 335L923 334.5L923.5 337L924.5 338L926 337H929L933.5 338L937.5 337L941 335L942 332.5L943.5 330.5L957 328.5L960 325L962.5 321L965 320L970 316.5L971.5 314.5L974 313L975.5 312.5L977.5 313L988 304V295.5L987 293.5L984.5 291V288.5V286.5L983 284.5L981.5 283.5L979.5 284.5L977.5 285.5H974L972.5 284.5L971 282H968L966 283.5L962 284.5H958L957 283L958 281L962.5 277.5V274.5L960 271V269.5L966 264.5L964.5 263L955.5 259.5L957 255.5L958 253.5L954.5 249.5V245L953.5 241L948 230L948.5 224.5L940.5 220L933.5 222L927 219L928 211L922 209L912.5 212.5L909.5 208L904 207.5L897 204V199.5L896 197.5L891.5 196L885 201L878 202.5L874.5 204L873.5 208H869.5L865.5 211.5L862.5 209.5L856 213L854 216L844 218.5L841 215H837L826.5 211.5L822.5 214Z', stroke: 'white', count: 0,
              nome: "Salesópolis"
            },
            {
              id: 17, path: 'M725 91L721.5 86L720.5 87L715 88.5L708.5 95L689 105.5L687.5 108L688 120L689 128.5L685 138.5L685.5 142L693.5 151L695 155.5V158L688 164L689.5 167L698 174L710 171.5L716.5 178L719 182.5L737 183L742.5 184.5L750.5 192L751 194L755 203.5L755.5 206L752.5 209.5L747.5 210L746 218.5L743 222L739 222.5L738.5 226L741.5 230.5L739 234.5L740.5 239.5L745.5 240.5L752.5 244L756 241L763 240.5L767.5 233L768.5 232L777.5 235.5L783.5 232.5L788 228H796L807 216.5L813.5 213L817 212L818.5 210L818 208L810.5 198.5L819 190L819.5 185.5L820 181L809.5 164L806.5 166H804L802 160.5H799.5L795.5 159L789.5 138L784.5 137.5L780.5 140L776.5 139.5L773.5 140.5L770 142L765 138.5L761 137.5L755 127L745 116V111L740.5 108L732.5 105L725.5 98L725 91Z', stroke: 'white', count: 0,
              nome: "Guararema"
            },
            {
              id: 18, path: 'M560.5 54L552 63L552.5 66.5L553.5 69L557 73.5V84L555 88.5L557 95L568 102L571 102.5L578.5 98.5L583.5 96.5L586.5 95.5L591 96L594 98.5L595.5 102L599 103V105.5L597.5 108L599 110V117.5L597 120L597.5 122.5L602 124.5L606.5 133L610.5 141.5L619 147.5L620.5 151.5H625L627 153L629.5 152.5L632 147.5V142L636 141.5L638.5 140L641.5 137L645 138.5L647 137L647.5 133L655.5 127.5L663 123.5L669 118.5L671.5 120H678L683 114.5V111L687.5 108.5L689.5 105.5L709 95L715.5 88.5L721.5 87L722 85.5L723 84.5L715.5 77V73.5V70.5L712.5 69.5L708.5 72L704 69.5L698 68L691 58.5L690 55.5L691 53.5V51.5L686.5 47.5L685.5 43V39.5H687L689 38.5V35.5L685.5 33.5L680 33L670 31L661.5 24.5V19.5L660 17.5L653.5 16.5L641.5 7L636.5 3H623L618 2.5L617.5 4.5L615.5 6L613.5 4.5L609.5 1L603 2.5V6L597.5 8.5L589.5 9.5L587.5 16.5L590 19.5V24.5L581 34.5L576.5 43.5L569.5 45L562.5 49.5L560.5 54Z', stroke: 'white', count: 0,
              nome: "Santa Isabel"
            },
            {
              id: 19, path: 'M516.5 89L515.5 88L513 90L510 93.5L508 96L505.5 99V101.5L505 104L504 106L501.5 106.5L499 108.5L497 111.5L496.5 112.5V114L497 115.5L497.5 117L495.5 119L493.5 119.5L490 119L482.5 118.5L477 121L471 119.5L470.5 117V115.5L468.5 113.5H466.5H465.5L461 114L459.5 114.5L457 115.5L454.5 117L451 116.5L448.5 117.5L445 119.5L439 122V127.5L434 131.5V138L431.5 142L426.5 144.5V152.5L420 156.5L419.5 168L418.5 171L419 172.5L418.5 181L416 185.5L417.5 189L419 193L421 197.5L422 201L422.5 205.5L422 209.5L421 211.5L422 216L424 220.5H426L431 219.5L436 214L443 207.5L451 203L459 200.5L464.5 200L478.5 202L485 203H500L503.5 199.5L506 198L513 198.5L520 195.5L522.5 196.5L523.5 199.5V201.5L520.5 202.5V205.5L522.5 207.5L526.5 204.5L531.5 204L536 201.5L537 197.5L529 180L530.5 178.5H535L537.5 176.5L536 172.5L541 169L548.5 172L551.5 171L548.5 166.5L549 159.5L542 148.5L546.5 143L547.5 140L545.5 137L548 131.5L546.5 125L566 109.5L566.5 105.5L567.5 102L556.5 95L554.5 88.5L556.5 84V73.5L554.5 71L553 69L552 66L551.5 63L548.5 63.5H543.5L539 66L534.5 71L531 70.5L526 75V78.5L521.5 80L521 82L516.5 89Z', stroke: 'white', count: 0,
              nome: "Guarulhos"
            },
            {
              id: 20, path: 'M380.5 50L373 50.5V53.5L372.5 55L368.5 57L367 58.5V61L366 62.5L361.5 63.5L357 65.5L356.5 67L357 68L360.5 70.5L363 71.5L365 71L367 76.5L368 78.5L369 79L371 80L372.5 81L373 82.5L372.5 85L372 86.5L370 87.5L368 89L366.5 91.5L365 93L363 94H360.5L359.5 96L358.5 100L355.5 107.5L354 111.5L353 115L351 121.5L351.5 122V130.5H356L356.5 131.5L359.5 144.5L353.5 153.5L351.5 160.5L356 164.5L358.5 167.5L361 168.5L364.5 168L368.5 166L372 164.5H375.5H378.5L380.5 163L381 161L381.5 159.5L383 159L386 159.5L388 159L388.5 157V155L389 152L391 148.5L393.5 147L395.5 146.5L397 145L397.5 144L396 142.5V140L396.5 138L397.5 137H400.5L403 136.5L404.5 135.5L406.5 133.5L409 130.5L410.5 129L412 128.5L414.5 129L417 129.5L417.5 128L419 126.5L422 125L424 123L427 119L428.5 118H430.5L434 120L437 121.5H439L442.5 120L445 119L448.5 117L451 116L455 116.5L457 115L461 113.5L465.5 113H468.5L470.5 115V116.5L471 119L477 120.5L479 119.5L482.5 118L490 118.5L493.5 119L495.5 118.5L496.5 117.5L497.5 116.5L497 115L496.5 113.5V112L497 111L499 108L501.5 106L504 105.5L505 103.5L505.5 101V98.5L510 93L513 89.5L515.5 87.5L514 84.5L511.5 80.5L510 77L507 73L504 70V65L503.5 63L499 62L492 60L489 59.5L487.5 60L486.5 62.5V65L484.5 65.5L483 66L480.5 65.5L478 62L473 55L470 50.5L467 47.5L463.5 45.5H454.5L453.5 44.5L453 42.5L452 41L451 39.5H431.5L429 38L426.5 36H424L419 35.5L417 33.5H415.5H407.5L405.5 35.5H398.5L396.5 34.5L396 31L395 30L389.5 29L387.5 29.5L387 34.5L385 38.5L383.5 41.5L383 48.5L380.5 50Z', stroke: 'white', count: 0,
              nome: "Mairiporã"
            },
            {
              id: 21, path: 'M352 130.5V121L351 123.5L348 124.5L331 121L327.5 122L321 117H307L305 116L304.5 108.5L300 99.5L299 98H296.5L295 99L290 101H287.5L286.5 104.5L286 108.5L284 111.5L281 112.5L278.5 111.5L276.5 109.5L274 109L270.5 110.5L268 110L266.5 108.5L264.5 105L257.5 104.5L253.5 103L253 105.5L252.5 108L251.5 115L251 120.5V127.5L251.5 132.5L252 137L252.5 141V147.5L260 147L262 145.5L265 144.5L267 145L269 148H276.5L278 145.5L280.5 144.5L283.5 144L287 139.5L289.5 138H292L295.5 139H298.5H307L322 148L325 151L325.5 153V156L333.5 163H341L342.5 158.5L345 157H347L352 160.5L354 153.5L360 144.5L357 131.5L356.5 130.5H352Z', stroke: 'white', count: 0,
              nome: "Caieras"
            },
            {
              id: 22, path: 'M240.5 72L239 78.5V80.5L240 82L242 85L244 86.5L246.5 87.5H247.5H249L250 88.5L250.5 90V97.5L252.5 101.5L253 103.5L257 105L264 105.5L264.5 106.5L266 109L267.5 110.5L270 111L272.5 110L273.5 109.5L276 110L278 112L280.5 113L283.5 112L285.5 109L286 105L287 101.5H289.5L292 100.5L294.5 99.5L296 98.5H298.5L299.5 100L302 105L304 109L304.5 116.5L306.5 117.5H320.5L327 122.5L330.5 121.5L334 122.5C336 123 340.1 124 340.5 124C340.9 124 345.333 124.667 347.5 125L350.5 124L354 112L358.5 100.5L359.5 96.5L360.5 94.5H363L365 93.5L367 91.5L368 89.5L370 88L372 87L372.5 85.5L373 83L372.5 81.5L371 80.5L368 79L367 77L366 74L365 71.5L363 72L360.5 71L357 68.5L356.5 67.5L357 66L361.5 64L366 63L367 61.5V59L368.5 57.5L372.5 55.5L373 54V52V51H372.5L372 51.5L369 53.5L365 56L355.5 59.5L350 60L340.5 64L339.5 66.5L341 67.5L342 69L338 73.5L325 75.5L320.5 80.5L299 81.5L293 74.5L281.5 65L281 61L276 55L273 57L267.5 52L264 53V60L258.5 62.5L254.5 67.5L247 66.5L243 71.5L241 72', stroke: 'white', count: 0,
              nome: "Franco da Rocha"
            },
            {
              id: 23, path: 'M241 71.5L243.5 71L247.5 66L255 67L259 62L264.5 59.5V52.5L268 51.5L273.5 56.5L276.5 54.5M276.5 54.5L281.5 60.5L282 64.5L293.5 74L299.5 81L321 80L325.5 75L338.5 73L342.5 68.5L341.5 67L340 66L341 63.5L343.5 62.5L350.5 59.5L356 59L365.5 55.5L373.5 50.5L370 48L365.5 50.5L362.5 51.5H357.5L354 50L350.5 49.5L349 50.5L348.5 52L343.5 52.5H338L335 51.5L333 49.5L331.5 46.5L327.5 47H323.5L320 45L318 44L314.5 46.5L311.5 47.5H306H302L298 48L296 49H293.5L290.5 50L288 51.5H286L283 50H281.5L276.5 54.5Z', stroke: 'white', count: 0,
              nome: "Franscisco Morato"
            },
            {
              id: 24, path: 'M251 160.5V163L246 166.5L245 168L239.5 162.5L236.5 160L229 157V154.5V152L228.5 150L227.5 148L226 147.5L221.5 148.5L211.5 143.5L209.5 145L208 146.5H203.5L193.5 143.5L192 139.5L191 138.5H188.5L187.5 139.5H185L183.5 139L182.5 138.5L180 136.5V132L181 131H188.5L198.5 123.5L199 119.5L195.5 116L193.5 115.5L189.5 117L181.5 117.5L181 119.5L180.5 121L180 122.5H179H178L177 122L176 119L174 114L174.5 112.5L175 112L176 111L177 109L176.5 101.5L175.5 93.5L181 88.5L184 86L188 85L191.5 86L195.5 87L197.5 86L199.5 84L202.5 82L205 80L207.5 79.5L208 78.5L209.5 75.5L210.5 73.5L212 72.5H213L214.5 70.5L215 69L217 68L219 67.5L222 66H224.5L226.5 67L228.5 68L230.5 68.5H232.5L234.5 67.5H236.5L238.5 68.5V70.5L240 71.5L239.5 73.5L239 75.5L238.5 78V80L240 82.5L242 85L243.5 86L246.5 87H248.5L249.5 88L250 89.5V93V96.5L250.5 98L252 101L252.5 103.5L252 105L251.5 108L251 111.5L250.5 115L250 120.5V127L250.5 132L251 137.5L251.5 141V147.5L250.5 148L249.5 150L250 151.5L251.5 154.5L252 156L251.5 159.5L251 160.5Z', stroke: 'white', count: 0,
              nome: "Cajamar"
            },
            {
              id: 25, path: 'M180.5 132.5V137L177.5 139L176 141L166 144.5L165 145.5L166 146.5L171.5 147L172 148.5L171.5 149.5L168 152V153.5L167 154.5L165 155H163.5H162.5L160 155.5L151.5 159L150.5 160V161.5L151.5 162.5V164.5L145 170L139 167.5H136.5L111.5 171.5L111 169V167.5V165L110 162.5L109 160.5V157.5L109.5 155L111 153L112 149V146.5L111.5 144L111 142L109 140.5L108 138.5V137L110.5 135.5L111.5 134L114 133L116.5 132.5L117 131V129L116.5 128L113.5 127.5L111.5 126.5L110 125.5L109 123.5V120.5V116.5V114.5L111 113L114 111.5L117.5 111H123.5L124.5 110L125 108.5L126 107L127.5 106L133 105L137.5 100.5H139L141 102L143 102.5L159 96L162.5 97.5H167L172.5 96L176 94L177 102L177.5 109.5L176.5 111.5L175 113L174.5 114.5L176.5 119.5L177.5 122.5L178.5 123H180.5L181.5 120L182 118L190 117.5L194 116L196 116.5L199.5 120L199 124L189 131.5H181.5L180.5 132.5Z', stroke: 'white', count: 0,
              nome: "Pirapora do Bom Jesus"
            },
            {
              id: 26, path: 'M262.5 190L266.5 194L265 194.5L258.5 205H256.5L254 202.5H252H250L248 202L245.5 204L241 203L235 202L233 204L225.5 203.5L222.5 199.5L221.5 200H215L214.5 198L212.5 196H210.5L209 197L205.5 207L192.5 210L186 206L164.5 207.5L159.5 214L137 220L135 218.5L131.5 216L129.5 213.5L127.5 210L126 206L123.5 204L122.5 201.5L123.5 199.5L126 194L127.5 190.5V186.5L126.5 182.5L125 179.5L122 178L117 177L111 173V171.5L128.5 169L136 167.5H138.5L144.5 170L151 164.5V162.5L150 161.5V160L151 159L159.5 155.5L162 155H164.5L166.5 154.5L167.5 153.5V152L169.5 150.5L171 149.5L171.5 148.5L171 147L165.5 146.5L164.5 145.5L165.5 144.5L175.5 141L177 139L180 137L182.5 139L185 140H187.5L188.5 139H191L192 140L193.5 144L203.5 147H208L209.5 145.5L211.5 144L221.5 149L223.5 148.5L226 148L227.5 148.5L228.5 150.5L229 152.5V157.5L236.5 160.5L240 163.5L245 168.5L246 167L251 163.5L258 171L259 179.5L262.5 190Z', stroke: 'white', count: 0,
              nome: "Santana de Parnaiba"
            },
            {
              id: 27, path: 'M265.5 194H267.5L266.5 203.5L258.5 215V217L260 218L260.5 220L255.5 228.5L252 230L246 225.5L244.5 222H232L229 228.5L225.5 230.5L224.5 234.5L227 237.5L225.5 246H224L220 247H217L214 246L211.5 249.5L209 250.5L207 249V245.5L206.5 242.5L205.5 239.5L206.5 237L205 233.5V231H201L198 228H192L188 224L182 223.5H179.5L171 217.5L162.5 216.5L160 213.5L165 207L187 205.5L193 209.5L206 206.5L208.5 199.5L209.5 196.5L211.5 195.5H213L215 197.5L215.5 199.5H222L223 199L226 203L233.5 203.5L235.5 201.5L246 203.5L248.5 201.5L250.5 202H254.5L257 204.5H259L265.5 194Z', stroke: 'white', count: 0,
              nome: "Barueri"
            },
            {
              id: 28, path: 'M266.5 287.5H259.5V301.5L255 304.5V306L260.5 311L272 314.5L272.5 312L274 309.5L276 307.5L280 307L281.5 304L284 302L286 301.5L287.5 300.5L289.5 296L292.5 292.5L296.5 289L299.5 287L301 284.5V283.5L299.5 282.5H296.5L293.5 280H290.5L289.5 281.5H284.5L280.5 284.5L274 286L269 285.5L266.5 287.5Z', stroke: 'white', count: 0,
              nome: "Taboao da Serra"
            },
            {
              id: 29, path: 'M226 243L225.5 246L226.5 249.5V251L224 252.5L219.5 253L216 259.5L221.5 263.5L226 268L229 269.5L237.5 271L239.5 268L243 266L248 269.5L252.5 271H255.5V262L253 257L253.5 249.5L254.5 241L255.5 228.5L252 230L246 225.5L244.5 222H232L229 228.5L225.5 230.5L224.5 234.5L227 237.5L226 243Z', stroke: 'white', count: 0,
              nome: "Carapicuíba"
            },
            {
              id: 30, path: 'M188 224.5L182 224V230L183.5 231.5H186.5L188.5 234V236.5L190.5 239.5L190 245.5L193 250L196 251V254L194 258.5L197 261.5H209.5L211.5 262.5L216 260L219.5 253.5L224 253L226.5 251.5V249.5L225.5 246.5H224L220 247.5H217L214 246.5L211.5 250L209 251L207 249.5V245.5L206.5 242.5L205.5 240L206.5 237.5L205 234V231.5H201L198 228.5H192L188 224.5Z', stroke: 'white', count: 0,
              nome: "Jandira"
            },
            {
              id: 31, path: 'M112.5 275.5L112 282.5H122.5L124 280H127.5L130.5 285L135 286L139 291H143.5V290L147.5 284.5L150 283L151.5 284.5H160L163 281.5V279.5L164.5 278.5L167 274.5L169.5 270L173 268.5L174.5 266.5V261.5L183 257.5L185 258.5H193.5L195.5 254V251L193 250L189.5 245.5L190 239L188 236V233.5L186 231.5H183L181.5 230V224H179L170.5 218L162 217L159.5 214L137 220V228.5L140 233.5L135 237L126 240V249.5L129 251.5L124.5 258.5L117 260L115.5 262L118 268L112.5 275.5Z', stroke: 'white', count: 0,
              nome: "Itapevi"
            },
            {
              id: 32, path: 'M265.5 334.5V339L261.5 341H251V336.5L249.5 333.5L246 334L244 336.5L236.5 337L234 340.5L231.5 338.5L224.5 338L219 338.5L218 334.5L209.5 328.5H205.5V329H201L195.5 325H191.5L189 323L195.5 310L197 303.5L207 300L211.5 294.5L216 296.5H221.5L224 292.5L229 291L231.5 296.5H236.5L243 300L247 298L254 291H259V301L254.5 304.5V305.5L259.5 310.5L263.5 312L271.5 314.5L271 327L269.5 330L265.5 334.5Z', stroke: 'white', count: 0,
              nome: "Embu"
            },
            {
              id: 33, path: 'M286 390L283.5 394.5H272L266 399H263.5L260 395.5L254 396.5L246 404L241.5 402.5L234 416H228.5L226 421L218.5 417V414.5L212 410.5L205.5 414.5H201.5V412.5L197 408.5L195 410.5V414.5L192.5 412.5L191 408.5L185 404.5L178 401V396L178.5 393.5L180 391.5V387L181.5 383.5V380.5L179.5 377V374.5L181.5 372H186.5V370.5L188 368.5H190.5L199 360.5L201 342.5L202 337.5L203.5 335L205.773 329H209.5L218 335L219 339L225 338.5L231.5 339L234 341L236.5 337.5L244 337L246 334.5L249.5 334L251 337V341.5H261.5L265.5 339.5L268.5 348L270.5 350.5V366L268 368.5L269 376.5L286 387.5V390Z', stroke: 'white', count: 0,
              nome: "Itapecerica da Serra"
            },
            {
              id: 34, path: 'M97.5 297L96 302.5L102.5 304H106.5L111.5 313L119.5 312.5L120.5 316L123 321H128.5L130 322.5L135.5 323.5L136.5 329.5L138 331L142 327.5L143.5 323.5V318L142 312.5V307.5L143.5 305V291H139L137.5 289.5L135 286L130.5 285L127.5 280H124L122.5 282.5H112L101.5 295.5L97.5 297Z', stroke: 'white', count: 0,
              nome: "Vargem Grande"
            },
            {
              id: 35, path: 'M259 284.5V288L255.5 284.5L254 279.5L257 275.5L255.5 271.5V262.5L253 257.5L255.5 229L259 223L260.5 220.5L260 218.5L258.5 217.5V215.5L259 214.5L266.5 204L267 199L267.5 194.5L268.5 193V191L269 188.5H272L274 191L279 191.5V190L279.5 188.5L283 188L285 189.5L284 191.5L283 193.5V197L287 199.5V202L285.5 203V204.5L286.5 205.5L289 209L292.5 210L295 212L294.5 213.5L290.5 218.5V220L294.5 221.5L295 225L298 228L300 230.5L299 232H295L293.5 233L292.5 240L293.5 245L292.5 250L290.5 256L284.5 259L281 263L272.5 269.5H267.5L262.5 271.5V278L261.5 280.5L259 284.5Z', stroke: 'white', count: 0,
              nome: "Osasco"
            },
            {
              id: 36, path: 'M134.5 419H139.5L145.5 414V406.5L151 404H153V400H157.5L159.5 404.5V406.5L163 412H168L169.5 406.5H174V401.5L177.5 400V395.5L178 393L179.5 391V386.5L181 383V380L179 376.5V374L181 371.5H186V370L187.5 368H190L198.5 360L199.5 350L200.5 342.5L201.5 337L203.5 333.5L205 329H200.5L198.5 327.5L195 325H191L188.5 323L191 317L195 310.5L196.5 303.5L206.5 300L211 294.5L215.5 296.5H221L223.5 292.5L228.5 291L231 296.5H236L242.5 300L246.5 298L253.5 291H258.5V287.5L255 284L253.5 279L256.5 275L255 271H251.5L247.5 269.5L242.5 266L239 268L237 271L228.5 269.5L225.5 268L221 263.5L215.5 259.5L211 262L209 261H196.5L193.5 258H185L183 257L178 259.5L174.5 261V266L173 268L169.5 269.5L166.5 275L164.5 278L163 279V281L160 284H151.5L150 282.5L147.5 284L143.5 289.5V296V305L142 308V310.5V312L143.5 318V323L142 326.5L140 329L138 330.5L136.5 329L135.5 323L130 322L128.5 320.5H123L120.5 315.5L119.5 312L111.5 312.5L109 308L106.5 303.5H102L96 302V310.5L92.5 313.5L89.5 315.5L80 322L83 336L94.5 340.5V344L97.5 351L94.5 356L103 373L110 374.5L114.5 380L112 383V387.5L117 391V393L114.5 396.5L120.5 402.5V408L125 412H128.5L134.5 419Z', stroke: 'white', count: 0,
              nome: "Cotia"
            },
            {
              id: 37, path: 'M198 512.5L195 510V508L196.5 503.5H201V500.5L206.5 495L208.5 483.5L215.5 480.5H220.5V477.5L226.5 474.5L233.5 462L235 453.5H220.5L215.5 451.5L210 445H206.5L203 441H206.5L211.5 436.5L208.5 432.5L215.5 425.5L213.5 422.5V416.5H218L225.5 420.5L228 415.5H233.5L241 402L245.5 403.5L253.5 396L260 395L263 398.5H266L271.5 394H282.5L274 402L273 412L268.5 415.5V418L267 421.5V423.5L291 434.5L292 441.5L289.5 445.5H279.5L278.5 448L281.5 453V480L266 482V480L263 477L261 480L263 483.5L259 489.5V498.5H257L247 508H233.5L231.5 510H227.5L224.5 508H221L216.5 510V503.5H211.5L208 510H203.5L198 512.5Z', stroke: 'white', count: 0,
              nome: "Embu-Guaçu"
            },
            {
              id: 38, path: 'M146 414.5L140.5 419H146V422.5L143.5 424L140.5 426H135.5L132.5 429L124.5 427.5L123.5 432L126 435V439.5L120.5 441.5L119 449L123.5 457L128.5 459L132.5 463L139 469.5V473L143.5 476.5L141 479.5L143.5 482.5H146.5L149.5 479.5L151 477.5H153.5L157.5 479.5L162 485L165 487L169 504L180.5 508L182 508.5L184 510.5L187.5 508.5L192 510.5H195.5V508.5L197 504H201.5V501L207 495.5L209 484L216 481H221V478L227 475L233.5 463L235.5 454H221L216 452L210.5 445.5H207L204 441.5H207L212 437L209 433L216 426L214 422.5V417H218.5V414.5L212 410.5L205.5 414.5H201.5V412.5L197 408.5L195 410.5V414.5L192.5 412.5L191 408.5L185 404.5L178 401L174.5 402.5V407H169.5L168 412.5H163.5L159.5 407V404.5L158 401H153.5V404.5H151.5L146 407V414.5Z', stroke: 'white', count: 0,
              nome: "Sao Lourenço da Derra"
            },
            {
              id: 39, path: 'M123.5 457L119 449.5L111.5 446L110.5 442L106.5 443.5L103 447.5L96.5 446L93 444L88 447.5L67.5 450.5L62.5 446H59V450.5L52 458L49 465V468.5L51 469.5L50 472L46.5 475.5V479L47.5 481.5L45 485L44.5 489L36 499.5L32.5 501L30 508.5L19.5 509.5L12 505L10 505.5V509.5L8 512H4.5L3 519L6.5 524L7 525.5L1 529V532L7 535.5L10 537.5V544.5L6.5 549.5L7 554.5H17L24 556.5L29.5 556L34.5 556.5L37.5 561.5H53L56 554.5L67 552L74.5 560V565L88 570.5L99 563.5H102L117 578.5V583.5V586.5L125 595L137 588.5L141.5 594L146 593L149 596.5L158.5 594V588.5L155.5 585L159 583L162.5 585L175 579.5L177 576L180.5 578.5V582H193.5L196 585L204 582L205 578L209.5 575L209 571L220.5 568.5L219.5 554L214.5 552.5L209.5 544L217.5 538L226 536.5L241 526L249.5 525L250.5 519.5L248 517L256 513L264 512V510.5L261.5 504L259.5 499H257.5L247 508.5H241H234.5L232 510.5H228L225 508.5H222L217 510.5V508.5V504H212L208.5 510.5H204L198.5 513L195 510.5H192L187.5 508.5L184 510.5L182 508.5L169 504L166.5 493.5L165 487L162 485L160 482.5L157.5 479.5L153.5 477.5H151L149.5 479.5L146.5 482.5H143.5L141 479.5L143.5 476.5L139 473V469.5L134.5 465L128.5 459L123.5 457Z', stroke: 'white', count: 0,
              nome: "Juquitiba"
            }
            // Adicione mais objetos para cada município conforme necessário
          ];
  
          // Para cada município, obtenha o número de publicações e adicione ao objeto
          const municipiosWithData = await Promise.all(
            municipiosData.map(async (municipio) => {
              const count = await getCountByMunicipioId(municipio.id);
              return { ...municipio, count };
            })
          );
  
          setMunicipios(municipiosWithData);
          setIsLoading(true);
        } catch (error) {
          console.error('Erro ao buscar dados dos municípios:', error);
        }
      };
  
      fetchMunicipiosData();
    }, []);

    
    
    return (
      <div>
        {isLoading ? (
          <FaSpinner className=" ml-10 sm:ml-20 animate-spin text-whiteCustom text-4xl w-3/4" />
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 989 598"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {municipios.map((municipio) => {
              let strokeColor = 'white'; // Cor padrão do traçado
              
              // Lógica para definir a cor do traçado com base em municipio.count
              if (municipio.count > 20) {
                strokeColor = 'red'; 
              } else if (municipio.count >= 10) {
                strokeColor = 'orange'; 
              } else if (municipio.count >= 1) {
                strokeColor = 'yellow'; 
              }
              
              return (
                <path
                  key={municipio.id}
                  d={municipio.path}
                  stroke={strokeColor}
                  strokeWidth={municipio.count >= 1 ? 3 : 0.5} // Ajuste a largura do traçado conforme necessário
                />
              );
              
            })}
          </svg>
        )}
      </div>
    );
  }
export default MapaInterativo
