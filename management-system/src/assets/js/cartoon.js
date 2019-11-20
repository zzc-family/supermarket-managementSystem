$(function(){
    //1. 获取窗口的高度和宽度
    var bodyX = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;
    console.log(bodyX,bodyH);

    var box = $("#box");
    console.log(box);

    //2. 动态创建“星星”的个数
    for (var i = 0; i < 100; i++) {
        var span = document.createElement("span");
        document.body.append(span);

        //2.2 随机分布
        var x = parseInt(Math.random()*bodyX);
        var y = parseInt(Math.random()*bodyH);

        span.style.left = x + "px";
        span.style.top = y + "px";

        var scale=Math.random()*1.5;
        span.style.transform='scale('+scale+','+scale+')';

        var rote=Math.random()*2;
        span.style.animationDelay=rote+'s';
    }

    function Ball(option){
        this.shuxing(option);
    }

    Ball.prototype = {
        shuxing:function(option){
            this.parentId = option.parentId;
            this.top = option.top;
            this.left = option.left;
            this.r =60;
            this.bgColor = option.bgColor;

            this.dX = _.random(-5,5)
            this.dY = _.random(-5,5)
            this.dR = _.random(10,10)

        },
        render:function(){
            var parentIdNode = document.getElementById(this.parentId);
            var childNode = document.createElement("div");
            parentIdNode.appendChild(childNode);

            childNode.style.position = "absolute";
            childNode.style.left = this.left+"px";
            childNode.style.top = this.top+"px";

            childNode.style.width = this.r+"px";
            childNode.style.height = this.r+"px";
            childNode.style.borderRadius = "50%";
            childNode.style.backgroundColor  = this.bgColor;
        },
        upData:function(){
            this.left+=this.dX;
            this.top+=this.dY;
            this.r-=this.dR;

            if(this.r<=0){
                this.r = 0;
                ballArr =_.without(ballArr,this);
            }
        }
    }
    var box = document.getElementById("box");

    var colorArr = ["blue","red","yellow","green","pink","orange","purple"]
    var ballArr = [];
    box.onmousemove = function(ev){

        var ball = new Ball({
            parentId:"box",
            left:ev.clientX,
            top:ev.clientY,
            bgColor:colorArr[_.random(0,colorArr.length-1)]
        });
//				ball.render();
        ballArr.push(ball);
    }
    setInterval(function(){
        for(var b = 0;b<box.children.length;b++){
            box.children[b].remove();

        }
        for(var a = 0;a<ballArr.length;a++){
            ballArr[a].render();
            ballArr[a].upData();
        }
    },30)
})
