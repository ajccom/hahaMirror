"use strict"
void function (isDebug) {
	var app = {
    setImg: function (src) {
      if (!src) {return}
      this.ctx = document.getElementById('canvas').getContext('2d');
      
      var img = new Image();
      img.onload = function () {
        document.getElementById('canvas2').getContext('2d').drawImage(img, 0, 0);
        app.ctx.drawImage(img, 0, 0);
        app.data = app.ctx.getImageData(0, 0, app.w, app.h);
        app.draw();
      }
      img.src = src;
    },
    draw: function () {
      //柔光
      //this.to();
      
      //光源
      //
      
      //放大镜
      //this.zoom(100, 100, 50, 1.5);
      
      //哈哈镜
      this.hahaMirror(100, 100, 80);
    },
    hahaMirror: function (centerX, centerY, radius) {
      var d = this.data.data,
          cc = document.getElementById('canvas2').getContext('2d').getImageData(0, 0, this.w, this.h),
          copy = cc.data,
          zoom = 1,
          i = 0,
          l = this.w * this.h,
          x = 0,
          y = 0,
          temp = 0,
          realRadius = parseInt(radius / zoom, 10),
          distance = 0;
      this.ctx.putImageData(cc, 0, 0);
      this.data = app.ctx.getImageData(0, 0, app.w, app.h);
      d = this.data.data;
      for (i; i < l; i++) {
        x = i % this.w;
        y = parseInt(i / this.w, 10);
        distance = Math.sqrt((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY));
        if (distance <= radius) {
          x = parseInt((x - centerX) / zoom, 10);
          y = parseInt((y - centerY) / zoom, 10);
          //开天眼算法。。。
          //x = parseInt(x * (realRadius /(radius - distance)), 10) + centerX;
          //y = parseInt(y * (realRadius /(radius - distance)), 10) + centerY;
          
          //放大镜算法
          x = parseInt(x * (distance / realRadius), 10) + centerX;
          y = parseInt(y * (distance / realRadius), 10) + centerY;
          
          
          temp = (y * this.w + x) * 4;
          d[i * 4] = copy[temp];
          d[i * 4 + 1] = copy[temp + 1];
          d[i * 4 + 2] = copy[temp + 2];
          
        }
      }
      
      this.ctx.putImageData(this.data, 0, 0);
    },
    zoom: function (centerX, centerY, radius, zoom) {
      var d = this.data.data,
          copy = this.ctx.getImageData(0, 0, this.w, this.h).data,
          i = 0,
          l = this.w * this.h,
          x = 0,
          y = 0,
          temp = 0;
      
      for (i; i < l; i++) {
        x = i % this.w;
        y = parseInt(i / this.w, 10);
        if ((x - centerX) * (x - centerX) + (y - centerY) * (y - centerY) <= radius * radius) {
          x = parseInt((x - centerX) / zoom + centerX, 10);
          y = parseInt((y - centerY) / zoom + centerY, 10);
          temp = (y * this.w + x) * 4;
          d[i * 4] = copy[temp];
          d[i * 4 + 1] = copy[temp + 1];
          d[i * 4 + 2] = copy[temp + 2];
        }
      }
      
      this.ctx.putImageData(this.data, 0, 0);
    },
    to: function () {
      
      //var ctx = this.tempCanvas.getContext('2d');
      
      //柔光
      var data = app.data.data,
          //d = data.slice(0),
          i = 0,
          l = this.w * this.h,
          temp = 0;
      for (i; i < l; i++) {
        temp = getAverage(i);
        data[4 * i] = temp[0];
        data[4 * i + 1] = temp[1];
        data[4 * i + 2] = temp[2];
      }
      this.ctx.putImageData(this.data, 0, 0);
      
      function getAverage (idx) {
        var d = app.data.data,
            w = app.w,
            h = app.h,
            c = 0,
            n = 0,
            r = 0,
            g = 0,
            b = 0;
        // l t
        c = (idx - w - 1) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // m t
        c = (idx - w) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // r t
        c = (idx - w + 1) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // l m
        c = (idx - 1) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // m m
        c = idx * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // r m
        c = (idx + 1) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // l b
        c = (idx + w - 1) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // m b
        c = (idx + w) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        // r b
        c = (idx + w + 1) * 4;
        if (d[c] >= 0) {
           n++;
           r += d[c];
           g += d[c + 1];
           b += d[c + 2];
        }
        
        r = r / n;
        g = g / n;
        b = b / n;
        return [r, g, b];
      }
      
    },
    _ini: function () {
      this.w = 200;
      this.h = 200;
      var c = document.createElement('canvas');
      c.width = this.w;
      c.height = this.h;
      this.tempCanvas = c;
    },
    ini: function (src) {
      this._ini();
      this.setImg(src);
      this.play();
    },
    play: function () {
      var c = document.getElementById('canvas');
      c.addEventListener('mousemove', function (e) {
        app.e = e || window.event;
        app.isOk = 1;
      });
      c.addEventListener('mouseup', function () {
        app.isOk = 0;
      });
      setInterval(function () {
        if (app.isOk) {
          var x = app.e.clientX - c.offsetLeft,
              y = app.e.clientY - c.offsetTop;
          app.hahaMirror(x, y, 80, 1);
        }
      }, 25);
    }
  };
	
	app.ini('ooo2.jpg');
	
  window.app = app;

}(false);