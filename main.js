async function getCaptcha() {
  const data = document.getElementsByClassName("row");
  if (data.length == 1) {
    location = location;
  }
  const captchaBlock = document.getElementById("captchaBlock");
  const img = captchaBlock.getElementsByTagName("img");
  const src = img[0].src;
  if (!src) {
    throw new Error("no soruce of image");
  }
  const image = new Image();
  image.src = src;

  let base64
  if(src.startsWith("data:image")){
    base64 = src.split(",")[1];
  }

  if(!base64){
    return null;
  }

  //feed this base64 image for a llm somehow(prolly in image format or )
  const ans = atob(base64);  

  await getText(ans);
  

}



const getText = async (ans) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(ans);
  console.log(ret.data.text);
  await worker.terminate();
}

getCaptcha()