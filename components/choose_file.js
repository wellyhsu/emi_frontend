function upload(e) {
  console.log("press button");
  var inputFile = document.getElementById('customFileInput');

  inputFile.addEventListener('change', function(e) {
  
    var fileData = e.target.files[0]; // 檔案資訊
    var fileName = fileData.name; // 檔案名稱
    var fileType = fileData.type; // 檔案類型
    var fileSize = Math.floor(fileData.size * 0.001); // 檔案大小轉成kb
    var fileTime = fileData.lastModifiedDate;
  
    console.log(fileData); // 用開發人員工具可看到資料
  
    if (!fileData) {
      return;
    }
  
    document.getElementById('file_name').value = fileName;
//      document.getElementById('file_type').innerText = fileType;
//      document.getElementById('file_size').innerText = fileSize + 'kb';
//      document.getElementById('file_time').innerText = fileTime;
//      document.getElementById('file_thumbnail').src = URL.createObjectURL(fileData);
  
  }, false);
}  