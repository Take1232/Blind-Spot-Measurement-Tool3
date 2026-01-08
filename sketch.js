let x0=400,posx,referenceX,radi=15,migi=true,number,mouten;
let input1;
let circles = [];
let showShape = false;

function setup() {
  createCanvas(windowWidth, windowHeight-200);
  frameRate(20);
  angleMode(DEGREES);
  
//  初期値の設定
    referenceX=width/2-400
//  円の初期設定
    for (let i = 0; i < 8; i++) {
    circles.push({
      angle: i,    
      x: 20,      
      moving: false  
    });
  } 
  
  
//  リセットボタン   
    button1 = createButton("リセット (r)");
    button1.size(150,40);
    button1.position(width/2-75,height+5);
    button1.mousePressed(reset);
//  左右切り替えボタン 
    button2=createButton("左右切り替え (c)");
    button2.size(150,40);
    button2.position(width/2-225,height+5);
    button2.mousePressed(change);
  
    button3=createButton("図形を表示");
    button3.size(150,40);
    button3.position(width/2+75,height+5);
    button3.mousePressed(toggleShape);

  
//  100pxの長さ　入力フォーム
    input1 = select('#input_pixelLen'); 
    input1.input(update_mouten);
//  観察距離　入力フォーム
    input2 = select('#input_obsDist');  
    input2.input(update_mouten);
//  盲点の位置　入力フォーム  
    input3 = select('#input_angle');    
    input3.input(update_mouten);
  
    update_mouten();
}

function draw(){
  background(230);
  grid();
  
  //中心の十字
  push();
    strokeWeight(6); 
    line(referenceX-15,height/2,referenceX+15,height/2);
    line(referenceX,height/2-15,referenceX,height/2+15);
  pop();
  
  if(showShape == true) {
    draw_shape();
  }
  
  move_mouten();
  
}

function reset(){
 for (let i=0;i<circles.length;i++) {
    let c=circles[i];
      c.x =20;
      c.moving=false;
    } 
  showShape = false;
}

function change(){
  reset();  
  if(migi==true){
    migi=false
    //初期値変更
    referenceX=width/2+400
  }else{
    migi=true
    //初期値変更
    referenceX=width/2-400 
  }
}

function update_mouten(){
  px = input1.value()/100; //1pxの長さ(mm)
  l = 10 * input2.value(); //観察距離(mm)
  theta = input3.value(); //(°)
  mouten = (l/px)*tan(theta);
  if(migi==true){
  mouten = int(mouten);  
  }
  else{
  mouten = -1*int(mouten); 
  }
}

function move_mouten(){
  for (let i=0;i<circles.length;i++) {
    let c=circles[i];
    if (c.moving) {
      c.x += 1;}
    push();
      fill(255,0,0);
      translate(referenceX+mouten,height/2)
      rotate(c.angle * 45);
      ellipse(c.x, 0, 15,15);
    pop();
  }
}

function grid(){
  push();
    translate(width/2,height/2);
    strokeWeight(0.5);
    for(let i=0; i<width/2+50;i+=50)
    line(i,-height/2,i,height/2)
    for(let i=0; i<height+50;i+=50)
    line(-width/2,i,width/2,i)
    for(let i=0; i<width/2+50;i+=50)
    line(-i,-height/2,-i,height/2)
    for(let i=0; i<height+50;i+=50)
    line(width/2,-i,-width/2,-i)
  pop();
}

function keyTyped(){
  if(key==="r"){
    reset();
  } if(key==="c"){
    change();
  }
}

function keyPressed() {
  let n = int(key);
//   入力フォームに数字を入力しているときは球が動かない
  if (document.activeElement === input1.elt || document.activeElement === input2.elt || document.activeElement === input3.elt) {
  }else{
  if (n >= 1 && n <= 8) {
    let c = circles[n - 1];
    c.moving = !c.moving; 
  }
  }
}  


function draw_shape(){
  push();
  let centerX = referenceX + mouten;
  let centerY = height / 2;
  
  stroke(255, 0, 0);
  strokeWeight(2);
  fill(255, 0, 0, 50);
  
  beginShape();
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    let vx = centerX + cos(c.angle * 45) * c.x;
    let vy = centerY + sin(c.angle * 45) * c.x;
    vertex(vx, vy);
  }
  endShape(CLOSE); 
  pop();
}

function toggleShape() {
  showShape = !showShape;
}
