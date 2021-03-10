const themeMode = $("input[name='switch']");
const switchThemeInfo = $('.switch__info');
const logoName = $('.logo-name');
const home = $('.home');
const paragraph = $('p');
const headerLine = $('hr');
const socialButtons = $('.s-btn');

class Theme {
    get mode() {
        return localStorage.getItem('color-scheme');
    }

    set state(mode) {
        localStorage.setItem('color-scheme', mode);
        this.apply(mode);
    }

    apply(state) {
        if (state === 'dark') {
            logoName.removeClass("logo-name-light").addClass("logo-name-dark");
            paragraph.removeClass("p-light").addClass("p-dark");
            socialButtons.removeClass("s-btn-light").addClass("s-btn-dark");
            home.removeClass("home-light").addClass("home-dark");
            $('.animate-border').removeClass("animate-border-light").addClass("animate-border-dark");
            headerLine.removeClass("hr-light").addClass("hr-dark");

            themeMode.attr('checked', true);
            switchThemeInfo.textContent = 'Dark Mode Active';
        } else {
            logoName.removeClass("logo-name-dark").addClass("logo-name-light");
            paragraph.removeClass("p-dark").addClass("p-light");
            socialButtons.removeClass("s-btn-dark").addClass("s-btn-light");
            home.removeClass("home-dark").addClass("home-light");
            $('.animate-border').removeClass("animate-border-dark").addClass("animate-border-light");
            headerLine.removeClass("hr-dark").addClass("hr-light");

            themeMode.attr('checked', false);
            switchThemeInfo.textContent = 'Light Mode Active';
        }
    }

    initialize() {
        if (this.mode === "") {
            const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDarkMode) {
                this.state('dark')
            } else {
                this.state('light')
            }
        } else {
            this.state = this.mode;
        }
    }

    onToggleClick = (e) => {
        const newScheme = this.mode === 'dark' ? 'light' : 'dark';
        return this.state = newScheme;
    }
}

$(window).on('load', () => {
    let theme = new Theme();
    themeMode.on('click', theme.onToggleClick);
    setTimeout(() => {
        $('#preloader').velocity({
            opacity: 0.1,
            translateY: "-80px"
        }, {
            duration: 400,
            complete: () => {
                $('#preloader-container').velocity({
                    translateY: "-110%"
                }, {
                    duration: 1000,
                    easing: [0.7, 0, 0.3, 1],
                    complete: () => {
                        $('.home').addClass('animate-border divide');
                        theme.initialize();
                    }
                })
            }
        })
    }, 1000)
})