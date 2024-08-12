/*v2.2.0-beta*/

import plugin from '../plugin.json';
import style from './style.scss';
import tag from 'html-tag-js';

const selectionMenu = acode.require('selectionMenu');
const toast = acode.require('toast');
const prompt = acode.require('prompt');

class AcodePlugin {

  async init($page) {
    selectionMenu.add(this.run.bind(this), 'Dubug', 'all');
    // editorManager.
    editorManager.editor.commands.addCommand({
      name: "Responsive",
      description: "Responsive",
      bindKey: {
        win: "Ctrl-T"
      },
      exec: this.run.bind(this),
    });

    // Initialising $page for plugin
    $page.id = "responsiveTools";
    $page.settitle("Responsive");
    this.$page = $page;

    this.$runBtn = tag('span', {
      className: 'icon play_circle_filled',
      attr: {
        action: 'run',
      },
      onclick: this.run.bind(this),
    });

    // Adding custom styles to $page 
    this.$style = tag('style', {
      textContent: style,
    });

    this.$navbar = tag('div', {
      className: "navbar",
      children: [
        tag("input", {
          className: "menu-navbar hamburgerMenu",
          type: 'checkbox',
        }),
        tag("span", {
          className: "menu-navbar icon arrow_forward",
        })
      ],
    });

    this.$menuSlide = tag("div", {
      className: "menu-slide",
      child: tag('div', {
        className: 'menu',
        children: [
          tag('div', {
            className: 'custom-screen',
            children: [
              tag('input', {
                className: 'input-width',
                placeholder: 'width',
                type: 'number',
                id: 'width',
              }),
              tag('input', {
                className: 'input-height',
                placeholder: 'height',
                type: 'number',
                id: 'height',
              }),
              tag('button', {
                className: 'button-apply',
                textContent: 'Apply',
              }),
            ],
          }),
          tag('div', {
            className: 'borders',
          }),
          tag('ul', {
            className: 'menu-list',
            children: [
              // MOBILE
              tag('li', {
                className: 'dropdown',
                children: [
                  tag('label', {
                    textContent: 'MOBILE',
                    className: 'label',
                    child: tag('i', {
                      className: 'icon expand_more',
                    }),
                  }),
                  tag('ul', {
                    className: 'mobile',
                    children: [
                      // iPhone
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'iPhone',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 5',
                                  id: '320x568iphone5',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '320x568',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 6/6s',
                                  id: '375x667iphone6/6s',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '375x667',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 6 Plus/6S Plus ',
                                  id: '414x736iphone6plus/6splus',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '414x736',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 7',
                                  id: '375x667iphone7',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '375x667',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 7 Plus',
                                  id: '414x736iphone7plus',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '414x736',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 8',
                                  id: '375x667iphonehone8',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '375x667',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone 8 Plus',
                                  id: '414x736iphone8plus',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '414x736',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone X',
                                  id: '375x812iphonex',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '375x812',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone XS Max',
                                  id: '414x896iphonexsmax',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '414x896',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone XS',
                                  id: '375x812iphonexs',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '375x812',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPhone XR',
                                  id: '414x896iphonexr',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '414x896',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // Samsung
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Samsung',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy S7',
                                  id: '360x640samsunggalaxys7',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x640',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy S7 Edge',
                                  id: '360x640samsunggalaxys7edge',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x640',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy S8',
                                  id: '360x740samsunggalaxys8',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x740',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy S8+',
                                  id: '360x740samsunggalaxys8+',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x740',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy S9',
                                  id: '360x740samsunggalaxys9',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x740',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy S9+',
                                  id: '360x740samsunggalaxys9+',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x740',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy Note 5',
                                  id: '480x853samsunggalaxynote5',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '480x853',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy Note 9',
                                  id: '360x740samsunggalaxynote9',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x740',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // One Plus
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'One Plus',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'One Plus 3',
                                  id: '480x853oneplus3',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '480x853',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // LG
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'LG',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'LG G5',
                                  id: '480x853lgg5',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '480x853',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // Google Pixel
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Google Pixel',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Google Pixel',
                                  id: '412x732googlepixel',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x732',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Google Pixel XL',
                                  id: '412x732googlepixelxl',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x732',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Google Pixel 2 XL',
                                  id: '412x732googlepixel2xl',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x732',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Google Pixel 3',
                                  id: '412x824googlepixel3',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x824',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: ' Google Pixel 3 XL',
                                  id: '412x847googlepixel3xl',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x847',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // Nexus
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Nexus',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Nexus 5X',
                                  id: '412x732nexus5x',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x732',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Nexus 6P',
                                  id: '412x732nexus6p',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '412x732',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // Xiaomi
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Xiaomi',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Xiaomi Redmi 4X/4',
                                  id: '360x640xiaomiredmi4x4',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x640',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Xiaomi Redmi Note 3',
                                  id: '360x640xiaomiredminote3',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x640',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Xiaomi Redmi Note 4',
                                  id: '360x640xiaomiredminote4',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '360x640',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Xiaomi Redmi Note 5',
                                  id: '393x786xiaomiredminote5',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '393x786',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              // TABLET
              tag('li', {
                className: 'dropdown',
                children: [
                  tag('label', {
                    textContent: 'TABLET',
                    className: 'label',
                    child: tag('i', {
                      className: 'icon expand_more',
                    }),
                  }),
                  tag('ul', {
                    className: 'tablet',
                    children: [
                      // ipad
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'iPad',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPad Mini',
                                  id: 'IpadMini768x1024',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '768x1024',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPad Mini 2 & 3',
                                  id: 'IpadMini2and3768x1024',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '768x1024',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPad Air 1 & 2',
                                  id: 'iPadAir1And2768x1024',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '768x1024',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPad Third & Fourth Generation',
                                  id: 'iPadThirdAndFourthGeneration768x1024',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '768x1024',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'iPad Pro',
                                  id: 'iPadPro1024x1366',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '1024x1366',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // nexus
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Nexus',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Nexus 7 (2013)',
                                  id: 'Nexus7and2013and600x960',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '600x960',
                                  }),
                                }),
                              }),
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Nexus 9',
                                  id: 'Nexus9and768x1024',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '768x1024',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // samsung
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Samsung',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Samsung Galaxy Tab 10',
                                  id: 'SamsungGalaxyTab10and800x1280',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '800x1280',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      // Chromebook
                      tag('li', {
                        className: 'dropdown',
                        children: [
                          tag('label', {
                            textContent: 'Chromebook',
                            className: 'label',
                            child: tag('i', {
                              className: 'icon expand_more',
                            }),
                          }),
                          tag('ul', {
                            className: 'submenu',
                            children: [
                              tag('li', {
                                child: tag('label', {
                                  textContent: 'Chromebook Pixel',
                                  id: '1280x850ChromebookPixel',
                                  className: 'ppp',
                                  child: tag('i', {
                                    textContent: '1280x850',
                                  }),
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              // DESKTOP
              tag('li', {
                className: 'dropdown',
                children: [
                  tag('label', {
                    textContent: 'DESKTOP',
                    className: 'label',
                    child: tag('i', {
                      className: 'icon expand_more',
                    }),
                  }),
                  tag('ul', {
                    className: 'submenu',
                    children: [
                      tag('li', {
                        child: tag('label', {
                          textContent: '10 Netbook',
                          id: '10Netbook1024x600',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1024x600',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '12 Netbook',
                          id: '12Netbook1024x768',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1024x768',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '13 Notebook',
                          id: '13Notebook1280x800',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1280x800',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '15 Notebook',
                          id: '15Notebook1366x768',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1366x768',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '19 Desktop',
                          id: '19Desktop1440x900',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1440x900',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '20 Desktop',
                          id: '20Desktop1600x900',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1600x900',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '22 Desktop',
                          id: '22Desktop1680x1050',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1680x1050',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '23 Desktop',
                          id: '23Desktop1920x1080',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1920x1080',
                          }),
                        }),
                      }),
                      tag('li', {
                        child: tag('label', {
                          textContent: '24 Desktop',
                          id: '24Desktop1980x1200',
                          className: 'ppp',
                          child: tag('i', {
                            textContent: '1980x1200',
                          }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
    
    this.$information = tag('div', {
      className: "information",
      children: [
        tag('h1', {
          id: "deviceInformation",
          className: "device-information",
          textContent: "iPhone 5"
        }),
        tag('h1', {
          id: "widthInformation",
          className: "width-information",
          textContent: "320px 568px"
        }),
      ]
    });

    this.$iframes = tag('div', {
      className: "iframes",
    });
    this.$coverIframes = tag('div', {
      className: 'coverIframes',
    });
    this.$viewPortIframe = tag('iframe', {
      className: 'viewPortIframe',
    });

    document.head.append(this.$style);
    this.$page.append(this.$navbar);
    this.$page.append(this.$menuSlide);
    
    this.$iframes.append(this.$information);
    
    this.$page.append(this.$iframes);
    this.$iframes.append(this.$coverIframes);
    this.$coverIframes.append(this.$viewPortIframe);

    this.checkRunnable();
    editorManager.on('switch-file', this.checkRunnable.bind(this));
    editorManager.on('rename-file', this.checkRunnable.bind(this));

    // remove and reset zoom, use the back arrow 
    $page.querySelector(".arrow_forward").addEventListener("click", () => {
      document.querySelector("[name='viewport']").setAttribute("content", " width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
      $page.remove();
    });

    document.addEventListener("backbutton", onBackKeyDown);
    function onBackKeyDown() {
      document.querySelector("[name='viewport']").setAttribute("content", " width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
      $page.remove();
    }

    /* remove header */
    $page.header.remove();
    $page.style.overflowY = 'hidden';

    /* mavbar */
    const toggelMenu = $page.querySelector(".hamburgerMenu");
    const menuSlide = $page.querySelector(".menu-slide");
    toggelMenu.addEventListener("click", function () {
      menuSlide.classList.toggle('active');
    });

    /* drop Down */
    const dropDown = $page.querySelectorAll('.dropdown');
    dropDown.forEach(item => {
      item.addEventListener('click', function (event) {
        event.stopPropagation();
        if (this.classList.contains('active')) {
          this.classList.remove('active');
        } else if (this.parentElement.parentElement.classList.contains('active')) {
          if (this.classList.contains('active')) {
            this.classList.remove('active');
          } else {
            Array.from(this.parentElement.children).forEach(itemMenu => {
              itemMenu.classList.remove('active');
            });
            this.classList.add('active');
          }
        } else {
          dropDown.forEach(dropDownE => {
            dropDownE.classList.remove('active');
          });
          this.classList.add('active');
        }
      });
    });

    /*Custom Screen */
    const customWidth = $page.querySelector(".input-width");
    const customHeight = $page.querySelector(".input-height");
    $page.querySelector(".button-apply").addEventListener("click", () => {
      if (customWidth.value.trim() === "" || customHeight.value.trim() === "") {
        window.toast('Width and Height cannot be empty', 3000);
      } else {
        /*remove menu slide*/
        toggelMenu.checked = false;
        menuSlide.classList.remove('active');
        dropDown.forEach(removeDropDown => {
          removeDropDown.classList.remove('active');
        });
        
        // set width and height
        this.$viewPortIframe.style.width = customWidth.value + 'px';
        this.$viewPortIframe.style.height = customHeight.value + 'px';
        
        $page.querySelector(".device-information").innerHTML = 'Custom';
        $page.querySelector(".width-information").innerHTML = customWidth.value + 'px' + ' ' + customHeight.value + 'px';
        
        // Clear the values after successful execution
        customWidth.value = "";
        customHeight.value = "";
      }
    });

    // iphone mobile
    $page.querySelector("[id='320x568iphone5']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      this.$viewPortIframe.classList.add('animate-change');

      // set width and height 
      this.$viewPortIframe.style.width = '320px';
      this.$viewPortIframe.style.height = '568px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 5';
      $page.querySelector(".width-information").innerHTML = '320px 568px';
    });
    $page.querySelector("[id='375x667iphone6/6s']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');

      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });

      // set width and height
      this.$viewPortIframe.style.width = '375px';
      this.$viewPortIframe.style.height = '667px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 6/6s';
      $page.querySelector(".width-information").innerHTML = '320px 667px';
    });
    $page.querySelector("[id='414x736iphone6plus/6splus']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '414px';
      this.$viewPortIframe.style.height = '736px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 6 plus / 6s plus';
      $page.querySelector(".width-information").innerHTML = '4140x 736px';
    });
    $page.querySelector("[id='375x667iphone7']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '375px';
      this.$viewPortIframe.style.height = '667px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 7';
      $page.querySelector(".width-information").innerHTML = '375px 667px';
    });
    $page.querySelector("[id='414x736iphone7plus']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '414px';
      this.$viewPortIframe.style.height = '736px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 7 Plus';
      $page.querySelector(".width-information").innerHTML = '414px 732px';
    });
    $page.querySelector("[id='375x667iphonehone8']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '375px';
      this.$viewPortIframe.style.height = '667px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 8';
      $page.querySelector(".width-information").innerHTML = '375px 667px';
    });
    $page.querySelector("[id='414x736iphone8plus']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '414px';
      this.$viewPortIframe.style.height = '736px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone 8 Plus';
      $page.querySelector(".width-information").innerHTML = '414px 736px';
    });
    $page.querySelector("[id='375x812iphonex']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '375px';
      this.$viewPortIframe.style.height = '812px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone X';
      $page.querySelector(".width-information").innerHTML = '375px 812px';
    });
    $page.querySelector("[id='414x896iphonexsmax']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '414px';
      this.$viewPortIframe.style.height = '896px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone xs max';
      $page.querySelector(".width-information").innerHTML = '414px 896px';
    });
    $page.querySelector("[id='375x812iphonexs'").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '375px';
      this.$viewPortIframe.style.height = '812px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone xs';
      $page.querySelector(".width-information").innerHTML = '375px 812px';
    });
    $page.querySelector("[id='414x896iphonexr']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '414px';
      this.$viewPortIframe.style.height = '896px';
      
      $page.querySelector(".device-information").innerHTML = 'iPhone XR';
      $page.querySelector(".width-information").innerHTML = '414px 896px';
    });

    // samsung mobile
    $page.querySelector("[id='360x640samsunggalaxys7']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '640px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy S7';
      $page.querySelector(".width-information").innerHTML = '320px 640px';
    });
    $page.querySelector("[id='360x640samsunggalaxys7edge']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '640px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy S6 Edge';
      $page.querySelector(".width-information").innerHTML = '360px 640px';
    });
    $page.querySelector("[id='360x740samsunggalaxys8']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '740px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy S8';
      $page.querySelector(".width-information").innerHTML = '360px 740px';
    });
    $page.querySelector("[id='360x740samsunggalaxys8+']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '760px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy S8+';
      $page.querySelector(".width-information").innerHTML = '360px 760px';
    });
    $page.querySelector("[id='360x740samsunggalaxys9']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '740px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy S9';
      $page.querySelector(".width-information").innerHTML = '360px 740px';
    });
    $page.querySelector("[id='360x740samsunggalaxys9+']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '740px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy S9+';
      $page.querySelector(".width-information").innerHTML = '320px 740px';
    });
    $page.querySelector("[id='480x853samsunggalaxynote5']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '480px';
      this.$viewPortIframe.style.height = '853px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy Note 5';
      $page.querySelector(".width-information").innerHTML = '480px 853px';
    });
    $page.querySelector("[id='360x740samsunggalaxynote9']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '740px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy Note 9';
      $page.querySelector(".width-information").innerHTML = '360px 740px';
    });

    // One Plus mobile
    $page.querySelector("[id='480x853oneplus3']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '480px';
      this.$viewPortIframe.style.height = '853px';
      
      $page.querySelector(".device-information").innerHTML = 'One Plus 3';
      $page.querySelector(".width-information").innerHTML = '480px 853px';
    });

    // LG mobile
    $page.querySelector("[id='480x853lgg5']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '480px';
      this.$viewPortIframe.style.height = '853px';
      
      $page.querySelector(".device-information").innerHTML = 'LG G5';
      $page.querySelector(".width-information").innerHTML = '480px 853px';
    });

    // Google Pixel mobile
    $page.querySelector("[id='412x732googlepixel']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '732px';
      
      $page.querySelector(".device-information").innerHTML = 'Google Pixel';
      $page.querySelector(".width-information").innerHTML = '412px 732px';
    });
    $page.querySelector("[id='412x732googlepixelxl']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '732px';
      
      $page.querySelector(".device-information").innerHTML = 'Google Pixel XL';
      $page.querySelector(".width-information").innerHTML = '412px 732px';
    });
    $page.querySelector("[id='412x732googlepixel2xl']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '732px';
      
      $page.querySelector(".device-information").innerHTML = 'Google Pixel 2 XL';
      $page.querySelector(".width-information").innerHTML = '412px 732px';
    });
    $page.querySelector("[id='412x824googlepixel3']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '824px';
      
      $page.querySelector(".device-information").innerHTML = 'Google Pixel 3';
      $page.querySelector(".width-information").innerHTML = '412px 824px';
    });
    $page.querySelector("[id='412x847googlepixel3xl']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '847px';
      
      $page.querySelector(".device-information").innerHTML = 'Google Pixel 3 xl';
      $page.querySelector(".width-information").innerHTML = '412px 847px';
    });

    // Nexus mobile
    $page.querySelector("[id='412x732nexus5x']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '732px';
      
      $page.querySelector(".device-information").innerHTML = 'Nexus 568px';
      $page.querySelector(".width-information").innerHTML = '412px 732px';
    });
    $page.querySelector("[id='412x732nexus6p']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '412px';
      this.$viewPortIframe.style.height = '732px';
      
      $page.querySelector(".device-information").innerHTML = 'Nexus 6P';
      $page.querySelector(".width-information").innerHTML = '412px 732px';
    });

    // Xiaomi mobile
    $page.querySelector("[id='360x640xiaomiredmi4x4']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '640px';
      
      $page.querySelector(".device-information").innerHTML = 'Xiaomi Redmi 4X/4';
      $page.querySelector(".width-information").innerHTML = '360px 640px';
    });
    $page.querySelector("[id='360x640xiaomiredminote3']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '640px';
      
      $page.querySelector(".device-information").innerHTML = 'Xiaomi Redmi Note 3';
      $page.querySelector(".width-information").innerHTML = '360px 640px';
    });
    $page.querySelector("[id='360x640xiaomiredminote4']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '360px';
      this.$viewPortIframe.style.height = '640px';
      
      $page.querySelector(".device-information").innerHTML = 'Xiaomi Redmi Note 4';
      $page.querySelector(".width-information").innerHTML = '360px 640px';
    });
    $page.querySelector("[id='393x786xiaomiredminote5']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '393px';
      this.$viewPortIframe.style.height = '786px';
      
      $page.querySelector(".device-information").innerHTML = 'Xiaomi Redmi Note 5';
      $page.querySelector(".width-information").innerHTML = '393px 786px';
    });

    // ipad
    $page.querySelector("[id='IpadMini768x1024']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '768px';
      this.$viewPortIframe.style.height = '1024px';
      
      $page.querySelector(".device-information").innerHTML = 'iPad Mini';
      $page.querySelector(".width-information").innerHTML = '768px 1024px';
    });
    $page.querySelector("[id='IpadMini2and3768x1024']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '768px';
      this.$viewPortIframe.style.height = '1024px';
      
      $page.querySelector(".device-information").innerHTML = 'iPad Mini 2 & 3';
      $page.querySelector(".width-information").innerHTML = '768px 1024px';
    });
    $page.querySelector("[id='iPadAir1And2768x1024']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '768px';
      this.$viewPortIframe.style.height = '1024px';
      
      $page.querySelector(".device-information").innerHTML = 'iPad Air 1 & 2';
      $page.querySelector(".width-information").innerHTML = '768px 1024px';
    });
    $page.querySelector("[id='iPadThirdAndFourthGeneration768x1024']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '768px';
      this.$viewPortIframe.style.height = '1024px';
      
      $page.querySelector(".device-information").innerHTML = 'Ipad Third & Fourth Generation';
      $page.querySelector(".width-information").innerHTML = '768px 1024px';
    });
    $page.querySelector("[id='iPadPro1024x1366']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '1024px';
      this.$viewPortIframe.style.height = '1366px';
      
      $page.querySelector(".device-information").innerHTML = 'iPad Pro';
      $page.querySelector(".width-information").innerHTML = '1024px 1366px';
    });

    // nexus ipad
    $page.querySelector("[id='Nexus7and2013and600x960']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '600px';
      this.$viewPortIframe.style.height = '960px';
      
      $page.querySelector(".device-information").innerHTML = 'Nexus 7 (2013)';
      $page.querySelector(".width-information").innerHTML = '600px 960px';
    });
    $page.querySelector("[id='Nexus9and768x1024']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '768px';
      this.$viewPortIframe.style.height = '1024px';
      
      $page.querySelector(".device-information").innerHTML = 'Nexus 9';
      $page.querySelector(".width-information").innerHTML = '768px 1024px';
    });

    // samsung ipad
    $page.querySelector("[id='SamsungGalaxyTab10and800x1280']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '800px';
      this.$viewPortIframe.style.height = '1280px';
      
      $page.querySelector(".device-information").innerHTML = 'Samsung Galaxy Tab 10';
      $page.querySelector(".width-information").innerHTML = '800px 1280px';
    });

    // Chromebook ipad
    $page.querySelector("[id='1280x850ChromebookPixel']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // close list
      dropDown.forEach(removeDropDown => {
        removeDropDown.classList.remove('active');
      });
      // set width and height
      this.$viewPortIframe.style.width = '1280px';
      this.$viewPortIframe.style.height = '850px';
      
      $page.querySelector(".device-information").innerHTML = 'Chromebook Pixel';
      $page.querySelector(".width-information").innerHTML = '1280px 850px';
    });

    // Desktop
    $page.querySelector("[id='10Netbook1024x600']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      this.$viewPortIframe.classList.add('animate-change');
      
      // set width and height
      this.$viewPortIframe.style.width = '1024px';
      this.$viewPortIframe.style.height = '600px';
      
      $page.querySelector(".device-information").innerHTML = '10 Notebook';
      $page.querySelector(".width-information").innerHTML = '1024px 600px';
    });
    $page.querySelector("[id='12Netbook1024x768']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      this.$viewPortIframe.classList.add('animate-change');
      // set width and height
      this.$viewPortIframe.style.width = '1024px';
      this.$viewPortIframe.style.height = '768px';
      
      $page.querySelector(".device-information").innerHTML = '12 Notebook';
      $page.querySelector(".width-information").innerHTML = '1280px 768px';
    });
    $page.querySelector("[id='13Notebook1280x800").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1280px';
      this.$viewPortIframe.style.height = '800px';
      
      $page.querySelector(".device-information").innerHTML = '13 Notebook';
      $page.querySelector(".width-information").innerHTML = '1280px 800px';
    });
    $page.querySelector("[id='15Notebook1366x768']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1366px';
      this.$viewPortIframe.style.height = '768px';
      
      $page.querySelector(".device-information").innerHTML = '15 Notebook';
      $page.querySelector(".width-information").innerHTML = '1366px 768px';
    });
    $page.querySelector("[id='19Desktop1440x900']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1440px';
      this.$viewPortIframe.style.height = '768px';
      
      $page.querySelector(".device-information").innerHTML = '19 Desktop';
      $page.querySelector(".width-information").innerHTML = '1440px 768px';
    });
    $page.querySelector("[id='20Desktop1600x900']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1600px';
      this.$viewPortIframe.style.height = '900px';
      
      $page.querySelector(".device-information").innerHTML = '20 Desktop';
      $page.querySelector(".width-information").innerHTML = '1600px 900px';
    });
    $page.querySelector("[id='22Desktop1680x1050']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1680px';
      this.$viewPortIframe.style.height = '1050px';
      
      $page.querySelector(".device-information").innerHTML = '22 Desktop';
      $page.querySelector(".width-information").innerHTML = '1680px 1050px';
    });
    $page.querySelector("[id='23Desktop1920x1080']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1920px';
      this.$viewPortIframe.style.height = '1080px';
      
      $page.querySelector(".device-information").innerHTML = '23 Desktop';
      $page.querySelector(".width-information").innerHTML = '1920px 1080px';
    });
    $page.querySelector("[id='24Desktop1980x1200']").addEventListener("click", () => {
      // remove menu slide
      toggelMenu.checked = false;
      menuSlide.classList.remove('active');
      // set width and height
      this.$viewPortIframe.style.width = '1980px';
      this.$viewPortIframe.style.height = '1200px';
      
      $page.querySelector(".device-information").innerHTML = '24 Desktop';
      $page.querySelector(".width-information").innerHTML = '1980px 1200px';
    });
  }

  async run() {
    const result = await prompt('Enter Url', '', 'text', {
      required: true,
      placeholder: 'http://',
    });
    // set src iframe
    if (result) {
      this.$page.show();
      document.querySelector("[name='viewport']").setAttribute("content", "width=1024, height=768");
      this.$viewPortIframe.src = result;
    }
  }

  async destroy() {
    if (this.$runBtn) {
      this.$runBtn.onclick = null;
      this.$runBtn.remove();
    }
    editorManager.off('switch-file', this.checkRunnable.bind(this));
    editorManager.off('rename-file', this.checkRunnable.bind(this));
  }

  checkRunnable() {
    const file = editorManager.activeFile;
    if (this.$runBtn.isConnected) {
      this.$runBtn.remove();
    }
    if (file) {
      const $header = root.get('header');
      $header.get('.icon.play_arrow')?.remove();
      $header.insertBefore(this.$runBtn, $header.lastChild);
    }
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(
    plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
      if (!baseUrl.endsWith('/')) {
        baseUrl += '/';
      }
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init($page, cacheFile, cacheFileUrl);
    }
  );
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}