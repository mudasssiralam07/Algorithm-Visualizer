////////////////Creating Boxes//////////////////
var binary=false;
var linear=true;
 

var arr=[];
function createbar_lsearch(lent=20){
    const bar = document.querySelector("#array");
    bar.innerHTML = '';

    for(var i=0; i<lent; i++){
        arr[i]=Math.floor((Math.random()*200)+1);
    }

    for(var i=1; i<=lent; i++){
        var ele=document.createElement("DIV");
        document.getElementById("array").appendChild(ele);
        ele.classList.add("boxes");
    }

    document.getElementById("output").innerHTML="";
    var ele=document.querySelectorAll(".boxes");
    for(var i=0;i<ele.length;i++){
        ele[i].innerHTML=arr[i];
    }
}

function createbar_bsearch(lent=20){
    const bar = document.querySelector("#array");
    bar.innerHTML = '';

    for(var i=0; i<lent; i++){
        arr[i]=Math.floor((Math.random()*200)+1);
    }

    arr.sort(function(a,b){return a-b});
    for(var i=1; i<=lent; i++){
        var ele=document.createElement("DIV");
        document.getElementById("array").appendChild(ele);
        ele.classList.add("boxes");
    }

    document.getElementById("output").innerHTML="";
    var ele=document.querySelectorAll(".boxes");
    for(var i=0;i<ele.length;i++){
        ele[i].innerHTML=arr[i];
    }
}
createbar_lsearch();

var no_bars=20;

const size=document.querySelector("#Size");
size.addEventListener('input',function(){
    no_bars=parseInt(size.value);
    if(binary){
        createbar_bsearch(no_bars);
     }
     else{
        createbar_lsearch(no_bars);
     }
});

function change(){
    if(binary){
       createbar_bsearch(no_bars);
    }
    else{
        createbar_lsearch(no_bars);
    }
}

var speed=document.querySelector("#speed");
speed.addEventListener('input',function(){
    
    delay=320-parseInt(speed.value);    
});

////////////////////////// wait function /////////////////////////////////////////
function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

/////////////////////////// New Array //////////////////////////////////////////////

var narr=document.querySelector('#newarray');
narr.addEventListener('click', change);

/////////////////////////// Binary Search //////////////////////////////////////////////
var delay=600;
async function bsearch(){
    var x=document.querySelector("#num");
    var num=parseInt(x.value);
    if(x.value.length==0){
        document.getElementById("output").innerHTML=`Please Enter a Number`
        document.getElementById("output").style.color="red"
        return;
    }

    var ele=document.querySelectorAll(".boxes");
    for(var i=0;i<ele.length;i++){ele[i].style.backgroundColor="aliceblue";ele[i].style.opacity=1;}
    document.getElementById("output").innerHTML=""
    var low=0,high=ele.length-1;
    var ans=-1;
    while(low<=high){
        console.log('running');
        
        ele[low].style.backgroundColor="pink";
        ele[high].style.backgroundColor="pink";
        var mid=low+parseInt((high-low)/2);
        await waitforme(delay);
        ele[mid].style.backgroundColor="yellow";
        if(parseInt(ele[mid].innerHTML)==num){
            await waitforme(delay);
            ans=mid;
            ele[low].style.backgroundColor="aliceblue";
            ele[high].style.backgroundColor="aliceblue";
            ele[mid].style.backgroundColor="lightgreen";
            for(var i=0;i<ele.length;i++){if(i!=mid)ele[i].style.opacity=0.5;}
            break;
        }
        else{
            if(parseInt(ele[mid].innerHTML)>num){
                await waitforme(delay);
            ele[high].style.backgroundColor="aliceblue";
            ele[mid].style.backgroundColor="aliceblue";
            high=mid-1;
            }
            else{
                await waitforme(delay);
                ele[low].style.backgroundColor="aliceblue";
                ele[mid].style.backgroundColor="aliceblue";
                low=mid+1;
            }
            for(var i=0;i<low;i++){ele[i].style.opacity=0.5;}
            for(var i=high+1;i<ele.length;i++){ele[i].style.opacity=0.5;}
        }
    }
    if(ans==-1){
        document.getElementById("output").innerHTML="Number Not Found!!"
        document.getElementById("output").style.color="red"
    }
     else{
        document.getElementById("output").innerHTML=`Element found at index ${ans}`
        document.getElementById("output").style.color="lightgreen"
     }

}

var search=document.querySelector("#bsearch");
search.addEventListener('click',async function(){
       await createbar_bsearch();
       binary=true;
       linear=false;
       console.log(binary);
});

/////////////////////////// Linear search //////////////////////////////////////////////

async function lsearch(){
    var x=document.querySelector("#num");
    var num=parseInt(x.value);
    if(x.value.length==0){
        document.getElementById("output").innerHTML=`Please Enter a Number`
        document.getElementById("output").style.color="red"
        return;
    }
    var ele=document.querySelectorAll(".boxes");
    for(var i=0;i<ele.length;i++){ele[i].style.backgroundColor="aliceblue";ele[i].style.opacity=1;}
    document.getElementById("output").innerHTML=""
    var ans=-1;
    for(var i=0;i<ele.length;i++){
        await waitforme(delay);
        ele[i].style.backgroundColor="pink";
        if(parseInt(ele[i].innerHTML)==num){
            await waitforme(delay);
            ans=i;
            ele[i].style.backgroundColor="lightgreen";
            document.getElementById("output").innerHTML=`Element found at index ${i}`
            document.getElementById("output").style.color="lightgreen"
            break;
        }
    }
    if(ans==-1){
        document.getElementById("output").innerHTML="Number Not Found!!"
        document.getElementById("output").style.color="red"
    }
}


var srch=document.querySelector("#lsearch");
srch.addEventListener('click',async function(){
       await createbar_lsearch();
       binary=false;
       linear=true;
       console.log(binary);
});


var search_button=document.querySelector("#search");
search_button.addEventListener('click',async function(){
    if(binary){
       await bsearch();
    }
    else{
       await lsearch();
    }
});