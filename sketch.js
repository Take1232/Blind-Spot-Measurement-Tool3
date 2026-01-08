let x0=400,posx=0,referenceX,radi=15,migi=true,mouten,d=10,count=0,l,px,theta,v,D;
let input1;

function setup() {
  createCanvas(windowWidth, windowHeight-200);
  frameRate(10);
  angleMode(DEGREES);
  
//  初期値の設定
    referenceX=width/2-400
  
//  リセットボタン   
    button1 = createButton("リセット (r)");
    button1.size(150,40);
    button1.position(width/2,height+5);
    button1.mousePressed(reset);
//  左右切り替えボタン 
    button2=createButton("左右切り替え (c)");
    button2.size(150,40);
    button2.position(width/2-150,height+5);
    button2.mousePressed(change);
  
  
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
  
  if(migi==true){ 
  posx=referenceX + mouten;
  }
  else{
  posx=referenceX - mouten;
  }
  fill(255,0,0);
  d+=count;
  ellipse(posx,height/2,d,d);
  
  calculation();
  
}

function reset(){
  d=10;
  count=0;
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
  mouten = int((l/px)*tan(theta));
}

function start(){
  if(count===0){
    count=1;}
  else{
    count=0;}
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
  if(keyCode===ENTER){
    start();
  }
}

function calculation(){  
  D=(d*px);
  v=2*atan(D/(2*l));
  
  // 視角 (v)
  let vFormatted = v.toFixed(2);
  let vElement = document.getElementById('result_v');
  if (vElement) {
      vElement.textContent = vFormatted;
  }
  
  // 直径 (D)
  let DFormatted = D.toFixed(0);
  let DElement = document.getElementById('result_D');
  if (DElement) {
      DElement.textContent = DFormatted;
  }
  
  push();
  fill(255,255,255,200);
  v=v.toFixed(2)
  textAlign(CENTER,TOP);
 
  textAlign(CENTER,BOTTOM);
  D=D.toFixed(0)
  
  pop();
  
}
