var arr=[];

function createbar(lent=75){
    const bar = document.querySelector("#bars");
    bar.innerHTML = '';

    for(var i=0; i<lent; i++){
        arr[i]=Math.floor((Math.random()*150)+10);
    }

    for(var i=1; i<=lent; i++){
        var ele=document.createElement("DIV");
        ele.setAttribute("id","height"+i);
        document.getElementById("bars").appendChild(ele);
        ele.classList.add("heights");
    }

    for(var i=1; i<=lent; i++){
        var xx=document.getElementById("height"+i);
        xx.style.height=2*arr[i-1]+"px";     
    }
}

createbar();

var no_bars=75;

const size=document.querySelector("#Size");
size.addEventListener('input',function(){
    no_bars=parseInt(size.value);
    createbar(no_bars)
});

function change(){
    createbar(no_bars);
}

delay=200;

var eve=document.getElementById("newarray");
eve.addEventListener("click", change);

var speed=document.querySelector("#speed");
speed.addEventListener('input',function(){
    
        delay=320-parseInt(speed.value);    
});

////////////////////////////////////////////////////////////////////////////////////

function swap(el1, el2)
    {
 
      const style1 = window.getComputedStyle(el1);
      const style2 = window.getComputedStyle(el2);
 
 
      const transform1 = style1.getPropertyValue("height");
      const transform2 = style2.getPropertyValue("height");
 
      el1.style.height = transform2;
      el2.style.height = transform1;

    }

    function waitforme(milisec) { 
        return new Promise(resolve => { 
            setTimeout(() => { resolve('') }, milisec); 
        }) 
    }
///////////////////////////////////////////////////////////////////////////////////
function disable(){
    document.getElementById("newarray").disabled=true;
    document.getElementById("bubsort").disabled=true;
    document.getElementById("selsort").disabled=true;
    document.getElementById("inssort").disabled=true;
    document.getElementById("quisort").disabled=true;
    document.getElementById("mersort").disabled=true;
    document.getElementById("Size").disabled=true;
    document.getElementById("hepsort").disabled=true;
}
function enable(){
    document.getElementById("newarray").disabled=false;
    document.getElementById("bubsort").disabled=false;
    document.getElementById("selsort").disabled=false;
    document.getElementById("inssort").disabled=false;
    document.getElementById("quisort").disabled=false;
    document.getElementById("mersort").disabled=false;
    document.getElementById("Size").disabled=false;
    document.getElementById("hepsort").disabled=false;
}
/////////////////////////////////////////////////////////////////////////////////////////
   async function bubble(){
       var ele=document.querySelectorAll(".heights");
        for(var i=0;i<ele.length;i++){
            for(var j=0;j<ele.length-1-i;j++){
                
                
                ele[j+1].style.backgroundColor="blue";
                ele[j].style.backgroundColor="blue";

                if(parseInt(ele[j].style.height)>parseInt(ele[j+1].style.height)){
                    await waitforme(delay)
                    swap(ele[j],ele[j+1]);
                }
                ele[j+1].style.backgroundColor="white";
                ele[j].style.backgroundColor="white";
            }
            ele[ele.length-1-i].style.backgroundColor="lightgreen";
        }
    }

var bsort=document.getElementById("bubsort");
bsort.addEventListener("click",async function(){
    disable();
    await bubble();
    enable();
});
////////////////////////////////////////////////////////////////////////////////////

async function selection(){
    const arry=document.querySelectorAll('.heights');

    for(var i=0;i<arry.length-1;i++){
       let minind=i;
       arry[i].style.backgroundColor="red";
        for(var j=i+1;j<arry.length;j++){
            arry[j].style.backgroundColor="blue";

            await waitforme(delay);

             if(parseInt(arry[j].style.height) < parseInt(arry[minind].style.height)){
                if(minind!=i){
                    arry[minind].style.backgroundColor="white";
                }
                minind=j;
             }
             else{
                arry[j].style.backgroundColor="white";
             }
             
        }
        await waitforme(delay);
             swap(arry[i],arry[minind]);
             var k=arr[i];
             arr[i]=arr[minind];
             arr[minind]=k;
            arry[minind].style.backgroundColor="white";
            arry[i].style.backgroundColor="lightgreen";
    }
    arry[arry.length-1].style.backgroundColor="lightgreen";
}


var sesort=document.getElementById("selsort");
sesort.addEventListener('click',async function(){
   disable();
    await selection();
    enable();
});

///////////////////////////////////////////////////////////////////////////////////
async function insert(){
    const v=document.querySelectorAll('.heights');
    for(var i=1;i<v.length;i++){
        var key=parseInt(v[i].style.height);
        v[i].style.backgroundColor="red";
        var j=i-1;
        while(j>=0 && parseInt(v[j].style.height)>key){
            v[j].style.backgroundColor="blue";
            await waitforme(delay);
            v[j+1].style.height=v[j].style.height;
            v[j].style.backgroundColor="lightgreen";
            j=j-1;
           
        }
        await waitforme(delay);
        v[i].style.backgroundColor="white";
        v[j+1].style.height=key+"px";
    }
    v[v.length-1].style.backgroundColor="lightgreen";
}

var insort=document.getElementById("inssort");
insort.addEventListener('click',async function(){
    disable();
    await insert();
    enable();
});

///////////////////////////////////////////////////////////////////////////////////////////////

async function patrition(ele,l,r){
       
        ele[r].style.backgroundColor="red";
        var i=l-1;
        for(var j=l;j<=r-1;j++){
            ele[j].style.background = 'yellow';
            await waitforme(delay);
            if(parseInt(ele[j].style.height)<parseInt(ele[r].style.height)){
                i++;
                swap(ele[i],ele[j]);
             ele[i].style.backgroundColor="gray";
             if(i != j) ele[j].style.backgroundColor = 'gray';
             
             await waitforme(delay);
            }
            else{
                ele[j].style.backgroundColor = 'pink';
            }

        }
        i++;
        ele[r].style.backgroundColor="pink";
        ele[i].style.backgroundColor="lightgreen";
        await waitforme(delay);
        swap(ele[i],ele[r]);
        for(let k = 0; k < ele.length; k++){
            if(ele[k].style.backgroundColor != 'lightgreen')
                ele[k].style.backgroundColor = 'white';
        }
        return i;
}

async function qsort(ele,l,r){
       if(l < r){
           var pi=await patrition(ele,l,r);
           await qsort(ele,l,pi-1);
           await qsort(ele,pi+1,r);
       }
       else{
        if(l >= 0 && r >= 0 && l <ele.length && r <ele.length){
            ele[r].style.background = 'lightgreen';
            ele[l].style.background = 'lightgreen';
        }
} 
}


var quisort=document.getElementById("quisort");
quisort.addEventListener('click',async function(){
    var ele=document.querySelectorAll('.heights');
    var l=0;
    var r=ele.length-1;
    disable();
    await qsort(ele,l,r);
    enable();
   
});



////////////////////////////////////////////////////////////////////////////////////////////////

async function merge(ele,l,m,r){
    var n1=m-l+1;
    var n2=r-m;
    var left=new Array(n1);
    var right=new Array(n2);
    for(var i=0;i<n1;i++){
        ele[l+ i].style.background = 'orange';
        left[i]=ele[l+i].style.height;
    }
    for(var j=0;j<n2;j++){
        ele[m + 1 + j].style.background = 'yellow';
        right[j]=ele[(j+1+m)].style.height;
    }
    var i=0,j=0,k=l;
    while(i<n1 && j<n2){
        await waitforme(delay);
       if(parseInt(left[i])<=parseInt(right[j])){
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'lightgreen';
        }
        else{
            ele[k].style.background = 'green';
        }
           ele[k].style.height=left[i];
           i++;
       }
       else{
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'lightgreen';
        }
        else{
            ele[k].style.background = 'green';
        }
        ele[k].style.height=right[j];
        j++;
       }
       k++;
    }
    while(i<n1){
        await waitforme(delay);
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'lightgreen';
        }
        else{
            ele[k].style.background = 'green';
        }
        ele[k].style.height=left[i];
           i++;
           k++;
    }
    while(j<n2){
        await waitforme(delay);
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'lightgreen';
        }
        else{
            ele[k].style.background = 'green';
        }
        ele[k].style.height=right[j];
        j++;
        k++;
    }
}

async function msort(ele,l,r){
    if(l>=r){
        return;
    }
    var m=l+Math.floor((r-l)/2);
    await msort(ele,l,m);
    await msort(ele,m+1,r);
    await merge(ele,l,m,r);
}


var mrsort=document.getElementById("mersort");
mrsort.addEventListener('click',async function(){
    var ele=document.querySelectorAll('.heights');
    var l=0;
    var r=parseInt(ele.length-1);
    disable();
    await msort(ele,l,r);
    enable();
});

/////////////////////////////////HEAP SORT/////////////////////////////////////////////////////////

async function heapify(ele,n,i){
        var largest=i;
        ele[i].style.background = 'pink';
        var l=2*i+1;
        var r=2*i+2;
        if(l<n){
            if(parseInt(ele[l].style.height)>parseInt(ele[largest].style.height)){
            largest=l; }
        }
        if(r<n){
            if(parseInt(ele[r].style.height)>parseInt(ele[largest].style.height)){
            largest=r; }
        }
        if(largest!=i){
            ele[largest].style.background = 'orange';
            await waitforme(delay);
            swap(ele[i],ele[largest]);
            await waitforme(delay);
           await heapify(ele,n,largest)
           ele[largest].style.background = 'white';
        }
        ele[i].style.background = 'white';
}

async function heapsort(ele,n){
    
    for(var i=parseInt(n/2)-1;i>=0;i--){
        await heapify(ele,n,i);
    }
    for(var i=n-1;i> 0;i--){
        ele[i-1].style.background = 'cyan';
        await waitforme(delay);
        swap(ele[0],ele[i]);
        ele[i].style.background = 'lightgreen';
        await heapify(ele,i,0);
        await waitforme(delay);

    }
    ele[0].style.background = 'lightgreen';

}

var hesort=document.getElementById("hepsort");
hesort.addEventListener('click',async function(){
    var ele=document.querySelectorAll('.heights');
    var n=parseInt(ele.length);
    disable();
    await heapsort(ele,n);
    enable();
});