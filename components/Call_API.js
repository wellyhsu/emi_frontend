/* Log in Call API  */

function Log_in() {    //登入按鈕
  var information;
  var S_DATA;
  console.log('press Log_in')
  console.log(accountRef.current.name +" is "+ accountRef.current.value);
  console.log(passwordRef.current.name +" is "+ passwordRef.current.value);

  const account_send =
  {
    "email": accountRef.current.value,
    "password": passwordRef.current.value,  //轉json格式
  }

  var account_send_json = JSON.stringify(account_send);  //轉json格式
  console.log("account_send_json is " + account_send_json);
  console.log('account_send_json is ',typeof(account_send_json));

  fetch("http://localhost:3000/api/hello/", {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: account_send_json,
  })
    .then((response) => {
      information = response.json();
      console.log('info^^',information);
      return information;
    })
    .then((data) => {
      S_DATA = data["name"]
      console.log('data',data["name"]);
      console.log('data Type',typeof(data));
//        document.getElementById('number').textContent = '預測結果為 : ' + S_DATA;	
    })
    .catch((error) => console.log("error", error));
//	window.location.replace("./home.html");
}