const canvasOrginal = document.querySelector("#canvas1");
const canvasEdit = document.querySelector("#canvas2");
const ctxOrginal = canvasOrginal.getContext('2d');
const ctxEdit = canvasEdit.getContext('2d');

let img = new Image();
let fileName = '';

const downloadBtn = document.querySelector("#download-btn");
const uploadFile = document.querySelector("#upload-file");
const revertBtn = document.querySelector("#revert-btn");



// add filter & effect
// using event delagtion insted of ser event lister to all button
document.addEventListener('click' , (e)=>{
  if(e.target.classList.contains('filter-btn')){
    
    if(e.target.classList.contains('brightness-add')){
      Caman('#canvas2' , img , function(){
        this.brightness(5).render();
      });
    } else if(e.target.classList.contains('brightness-remove')){
      Caman('#canvas2' , img , function(){
        this.brightness(-5).render();
      });
    } else if(e.target.classList.contains('contrast-add')){
      Caman('#canvas2' , img , function(){
        this.contrast(5).render();
      });
    }  else if(e.target.classList.contains('contrast-remove')){
      Caman('#canvas2' , img , function(){
        this.contrast(-5).render();
      });
    } else if(e.target.classList.contains('saturation-add')){
      Caman('#canvas2' , img , function(){
        this.saturation(5).render();
      });
    } else if(e.target.classList.contains('saturation-remove')){
      Caman('#canvas2' , img , function(){
        this.saturation(-5).render();
      });
    } else if(e.target.classList.contains('vibrance-add')){
      Caman('#canvas2' , img , function(){
        this.vibrance(5).render();
      });
    } else if(e.target.classList.contains('vibrance-remove')){
      Caman('#canvas2' , img , function(){
        this.vibrance(-5).render();
      });
    } else if(e.target.classList.contains('vintage-add')){
      Caman('#canvas2' , img , function(){
        this.vintage().render();
      });
    } else if(e.target.classList.contains('lomo-add')){
      Caman('#canvas2' , img , function(){
        this.lomo().render();
      });
    } else if(e.target.classList.contains('clarity-add')){
      Caman('#canvas2' , img , function(){
        this.clarity().render();
      });
    } else if(e.target.classList.contains('sincity-add')){
      Caman('#canvas2' , img , function(){
        this.sinCity().render();
      });
    } else if (e.target.classList.contains("crossprocess-add")) {
      Caman("#canvas2", img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains("pinhole-add")) {
      Caman("#canvas2", img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains("nostalgia-add")) {
      Caman("#canvas2", img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains("hermajesty-add")) {
      Caman("#canvas2", img, function() {
        this.herMajesty().render();
      });
    }
  }
})

//Upload file
uploadFile.addEventListener('change' , ()=>{
  //get file
  const file = document.querySelector("#upload-file").files[0];
  // iniy filereader
  const reader = new FileReader();

  if(file){
    // set file name 
    fileName = file.name;
    console.log(fileName);
    // read data as url
    reader.readAsDataURL(file);
  }
  //add image to canvas
  reader.addEventListener('load' , ()=>{
    // create img
    img = new Image();
    // set src
    img.src = reader.result;
    // on image load . add to canvas
    img.onload = ()=>{
      canvasOrginal.width = img.width;
      canvasOrginal.height = img.height;
      ctxOrginal.drawImage(img , 0 , 0 , img.width , img.height);
      canvasOrginal.removeAttribute('data-caman-id');

      //add img to canvas two
      canvasEdit.width = img.width;
      canvasEdit.height = img.height;
      ctxEdit.drawImage(img , 0 , 0 , img.width , img.height);
      canvasEdit.removeAttribute('data-caman-id');
    } 
  }, false);
});

//revert filter
revertBtn.addEventListener('click' , ()=>{
  Caman('#canvas2', img , function(){
    this.revert();
  });
})


//download event
downloadBtn.addEventListener('click' , ()=>{
  // get file ext
  const fileExtension = fileName.slice(-4);
  console.log(fileExtension);

  //init new file name
  let newFileName;

  //check image type
  if(fileExtension === '.jpg'  || fileExtension === '.png'){
    newFileName = fileName.substring(0, fileName.length-4)+"-edited" + fileExtension;
    console.log(newFileName);
  }

  // call download
  download(canvasEdit , newFileName);
});


function download(canvasEdit , fileName){
  //init event
  let e;
  //create a link
  const link = document.createElement('a');

  // set property
  link.download = fileName;
  link.href = canvasEdit.toDataURL('image/jpeg' , 0.8);
  //new mouse event
  e = new MouseEvent('click')
  //dispatch event
  link.dispatchEvent(e);
}


