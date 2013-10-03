function deviceOrientedImages(args) {
    "use strict";
    var SPEED = 20;

    var viewportWidth = verge.viewportW();
    var viewportHeight = verge.viewportH();
    var randomImagePositionX = [];
    var randomImagePositionY = [];
    var alpha, beta, gamma;
    var allImages;
    var allImagesLength;

    // find all images already in html
    var findAllHtmlImgs = (function () {
        var htmlImgs = document.querySelectorAll(".deviceOrientedImages");
        // convert nodelist to array
        htmlImgs = Array.prototype.slice.call(htmlImgs, 0);
        return {theImages: htmlImgs};
    }());

    // generate images dynamically
        var generateImages = (function () {
            var generatedImgs = [];
         if (args) {
            var howManyImages = args.howManyImages || 0;
            for (var i = 0; i < howManyImages; i++) {
                generatedImgs.push(new Image());
                generatedImgs[i].src = args.imagePath;
                generatedImgs[i].style.position = "fixed";
                generatedImgs[i].style.width = Math.floor(Math.random() * 150) + "px";
                generatedImgs[i].setAttribute("class", "deviceOrientedImages");
                generatedImgs[i].setAttribute("alt", "");
                document.getElementsByTagName("body")[0].appendChild(generatedImgs[i]);
            }
        }
            return {generatedImgs: generatedImgs};
        }());

    var rotateX = function (xAxis) {
        for (var i = 0; i < allImagesLength; i++) {
            if (randomImagePositionX[i] < 180) {
                if (xAxis < 360 && xAxis > (360 - (180 - randomImagePositionX[i]))) {
                    xAxis = -360 + xAxis;
                }
            } else { // if 180 or higher
                if (xAxis > 0 && xAxis > (randomImagePositionX[i] - 180)) {
                    xAxis = 360 + xAxis;
                }
            }
            allImages[i].style.left = (xAxis - randomImagePositionX[i]) * SPEED + "px";
        }
    };

    var rotateY = function (yAxis) {
        for (var i = 0; i < allImagesLength; i++) {
            allImages[i].style.top = randomImagePositionY[i] - yAxis * (600 / 180) + viewportHeight / 2 + "px";
        }
    };

    // join the two arrays
    allImages = findAllHtmlImgs.theImages.concat(generateImages.generatedImgs);
    allImagesLength = allImages.length;

    for (var i = 0; i < allImagesLength; i++) {
        allImages[i].style.position = "fixed";
//        randomImagePositionX[i] = -100 + Math.floor(Math.random() * 300);
        randomImagePositionX[i] = -79 + Math.floor(Math.random() * 200);
//        randomImagePositionX[i] = 0;
        randomImagePositionY[i] = -400 + Math.floor(Math.random() * 800);
//        randomImagePositionY[i] = 0;
    }

    rotateX(1);
    rotateY(1);



    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function (e) {
            // portrait
            if (window.innerHeight > window.innerWidth) {
                alpha = e.alpha;
                beta = e.beta;
                gamma = e.gamma;
                rotateX(alpha);
                rotateY(-beta);
            }

            // landscape
            else {
                alpha = e.alpha;
                beta = e.beta;
                if (e.gamma > 0) {
                    gamma = -e.gamma;
                } else {
                    gamma = e.gamma;
                }

                rotateX(alpha);
                rotateY(gamma);
            }
        }, false);
    }
}

/*
 * config, if you want to add some images, do it here (or direct in the html)
*/
var config = {
    imagePath: "img/bee2.png",
    howManyImages: 30
};

/*
 * initialise. If you don't want to add extra images, start without the config as follows:
 * deviceOrientedImages();
 */
deviceOrientedImages(config);