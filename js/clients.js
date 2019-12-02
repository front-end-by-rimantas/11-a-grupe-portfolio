class Clients {
    constructor ( target, imgPath ) {
        this.list = [];
        this.DOM = document.querySelector(target);
        this.DOMlist = null;
        this.multiplyer = 5;
        this.imgsPerView = 5;
        this.imgWidth = 100 / this.multiplyer / this.imgsPerView;
        this.listMarginLeft = -Math.floor(this.multiplyer / 2) * 100;
        this.listMarginLeftRepeat = -Math.floor(this.multiplyer / 2) * 100 - 120;
        this.listShift = 100 / this.imgsPerView;
        this.imgPath = imgPath;
        this.canAnimate = true;
        this.animationTime = 2000;
    }

    addClient = ( clientPhoto ) => {
        this.list = [...this.list, clientPhoto];
    }
    
    addClientsList = ( clientPhotoList ) => {
        this.list = [...this.list, ...clientPhotoList];
    }

    animationProcess = () => {
        setTimeout(() => {
            if ( this.canAnimate ) {
                this.listMarginLeft -= this.listShift;
                if ( this.listMarginLeft <= this.listMarginLeftRepeat ) {
                    this.listMarginLeft = this.listMarginLeftRepeat + 120;
                }
                this.DOMlist.style.marginLeft = this.listMarginLeft + '%';
                
                this.animationProcess();
            }
        }, this.animationTime)
    }

    startAnimation = () => {
        this.canAnimate = true;
        return this.animationProcess();
    }

    stopAnimation = () => {
        return this.canAnimate = false;
    }

    render = () => {
        let HTML = '';
        for ( let i=0; i<this.list.length * this.multiplyer; i++ ) {
            const item = this.list[i % this.multiplyer];
            HTML += `<img class="client-img"
                        src="${this.imgPath + item}"
                        alt="image"
                        style="width: ${this.imgWidth}%;">`;
        }
        this.DOM.innerHTML = `<div class="clients-list"
                                    style="width: ${100 * this.multiplyer}%;
                                            margin-left: ${this.listMarginLeft}%;">${HTML}</div>`;

        this.DOMlist = this.DOM.querySelector('.clients-list');
        this.startAnimation();

        // kaip ir gerai, bet techniskai maziau efektyvus nei tiesiog "for" ciklas
        // this.DOM.querySelectorAll('.client-img').forEach( img => {
        //     img.addEventListener('click', () => {
        //         console.log(`Paspaustas paveiksliukas: ${img.src}`);
        //     })
        // });
        return;
    }
}

const clientsBlock = new Clients('#clients > .row > .col-12', './img/brand/');

clientsBlock.addClient('b1.png');
clientsBlock.addClient('b2.png');
clientsBlock.addClient('b3.png');
clientsBlock.addClientsList(['b4.png', 'b5.png']);

clientsBlock.render();

console.log(clientsBlock);