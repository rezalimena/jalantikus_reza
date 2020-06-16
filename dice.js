function playGame(numPlayer,numDice)
{
  document.getElementById("iterasi").innerHTML = "";
  function printResult(player,numPlayer,msg)
  {
    document.getElementById("iterasi").innerHTML+=`${msg} <br>`;
    for (let index = 0; index < numPlayer; index++)  
    {  
      str = "";
      for (let index1 = 0; index1 < player[index].dice.length; index1++) {
        if(player[index].dice[index1] != 7)
          str += player[index].dice[index1] + ",";
        
      }    
      document.getElementById("iterasi").innerHTML+=`Pemain ${index+1} Score ${player[index].score} : `+str +"<br>";
    }
    document.getElementById("iterasi").innerHTML+="<br>"
  }

  numPlayer = numPlayer;
  numDice = numDice;

  player = [{  
    score : 0,
    play : true,
    diceCount : 0,
    dice : []  
  }]

  

  for (let index = 0; index < numPlayer; index++) {  
    player.push({
      score : 0,
      play : true,
      diceCount : numDice,
      dice : []  
      });    
  }
  player.shift();

  playGame = true;
  step = 1;
  while(playGame)
  {
    for (let index = 0; index < numPlayer; index++){  
      if(player[index].play)    
        for (let index1 = 0; index1 < player[index].diceCount; index1++) 
          player[index].dice.push(Math.floor(Math.random() * 6)+1)      
    }

    document.getElementById("iterasi").innerHTML+="=========================================<br>";
    //cetak step
    printResult(player,numPlayer,"Iterasi : "+ step)
  
    //evaluasi hasil
    for (let index = 0; index < numPlayer; index++)
    { 
      if(player[index].play)       
        for (let index1 = 0; index1 < player[index].dice.length; index1++)
        { 
          if(player[index].dice[index1] == 1)
          {
            nextpost = index + 1;
            if(nextpost >= numPlayer) 
                nextpost = 0;        
            while(player[nextpost].play == false)
            {
              nextpost ++;
              if(nextpost >= numPlayer) 
                nextpost = 0;        
            }    
            player[nextpost].dice.push(0);
            player[nextpost].diceCount ++;
            player[index].dice[index1] = 7;     
            player[index].diceCount --;   
          } else 
          if(player[index].dice[index1] == 6)
          {
            player[index].dice[index1] = 7;
            player[index].score ++;
            player[index].diceCount --;
          }
        } 
        player[index].dice.sort();  
    }

    for (let index = 0; index < numPlayer; index++)
    {       
      for (let index1 = 0; index1 < player[index].dice.length; index1++)
        if(player[index].dice[index1] == 0)
          player[index].dice[index1] = 1;        
    }

    //cetak evaluasi
    printResult(player,numPlayer,"Setelah Evaluasi :"+ step)

    //cek berhenti
    playerOut = 0;
    player.forEach(element => {
      if(element.diceCount <= 0) 
      {
        playerOut++;
        element.play = false;
      }
    });

    step++;
    if(numPlayer - playerOut == 1)      
    {
      playGame = false;
      
      idx = 0;
      score = player[0].score;
      draw = [];
      draw.push(1);
      for (let index = 1; index < numPlayer; index++)
      {
        if(score < player[index].score)
        {
          score=player[index].score
          idx = index;
          draw = [];
          draw.push(index+1);
        }
        else if(score == player[index].score)
          draw.push(index+1);
      }

      //winner
      document.getElementById("demo").innerHTML = "The Winner is : <br>";
      if(draw.length > 1)
        draw.forEach(element => {        
          document.getElementById("demo").innerHTML += `Draw Player ${element} with score ${score} <br>`;
        });
      else      
        document.getElementById("demo").innerHTML += `Player ${idx+1} with score ${score}`;
    }
    for (let index = 0; index < numPlayer; index++)
      player[index].dice = [];
  }

}