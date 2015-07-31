var React = require("react");

var new_sections = [
    {
        language: "en", key: "en",
        sections: [
            {
            name: "About", key: "about-section",
            items: [
                {name: "Current projects", key: "current"},
                {name: "About Ásgeir", key: "asgeir"}
                    ]
            }, {
            name: "People", key: "people-section",
            items: [
                {name: "Bragi", key: "bragi"},
                {name: "Alumni", key: "alumni"}
                ]
            }, {
                name: "Research", key: "research-section",
                items: [
                    {name: "Cancer", key: "cancer"},
                    {name: "Tobacco", key: "tobacco"},
                    {name: "Prevention", key: "prevention"},
                    {name: "Other research", key: "other"}
                ]
            }
        ]
    },
    {
        language: "sv", key: "sv",
        sections: [
            {
                name: "Om oss", key: "about-section",
                items: [
                    {name: "Pågående projekt", key: "current"},
                    {name: "Om Ásgeir", key: "asgeir"}
                ]
            }, {
                name: "Medarbetare", key: "people-section",
                items: [
                    {name: "Bragi", key: "bragi"},
                    {name: "Alumner", key: "alumni"}
                ]
            }, {
                name: "Forskning", key: "research-section",
                items: [
                    {name: "Cancer", key: "cancer"},
                    {name: "Tobak", key: "tobacco"},
                    {name: "Prevention", key: "prevention"},
                    {name: "Övrig forskning", key: "other"}
                ]
            }
        ]
    },
    {
        language: "is", key: "is",
        sections: [
            {
                name: "Um okkur", key: "about-section",
                items: [
                    {name: "Núverande verkefni", key: "current"},
                    {name: "Um Ásgeir", key: "asgeir"}
                ]
            }
        ]
    }
];

// Top panel

var TopPanel = React.createClass({
    render(){
        return (
            <div>
                <div className="row top-banner">
                    <div className="col-lg-2 col-md-1 hidden-sm hidden-xs"></div>
                    <div className="col-lg-10 col-md-11 col-sm-12 col-xs-12" id="title"><h1>Ásgeir R. Helgason Research Network</h1></div>
                </div>
                <div className="row"></div>
            </div>
        );
    }
});

// Sidebar menu

var Section = React.createClass({
    handleClick: function(){
        this.setState({
            open: !this.state.open,
            class: this.state.open ? "section" : "section open"
        });
    },
    getInitialState: function(){
        if(this.props.section.key == "about-section"){
            return {
                open: true,
                class: "section open"
            }
        } else {
            return {
                open: false,
                class: "section"
            }
        }
    },
    render: function() {
        return (
            <div className={this.state.class}>
                <div className="section-head" onClick={this.handleClick}>{this.props.section.name}</div>
                <div className="article-wrap">
                    <div className="article">
                        {this.props.section.items.map(function(item) {
                            return <SectionItem key={item.name}
                                                item={item}
                                                type={"section_item"}
                                                onChildClick={this.props.onChildClick}
                                                active={this.props.activeItem===item.key}
                                />
                        }.bind(this))}
                    </div>
                </div>
            </div>
        );
    }
});

var SectionItem = React.createClass({
    handleClick: function(){
        this.props.onChildClick(this);
    },
    getInitialState: function(){
        return {
            active: false,
            class: "section-item"
        }
    },
    render: function() {
        var className = this.props.active ? "section-item active" : "section-item";
        return (
            <div className={className} onClick={this.handleClick}>{this.props.item.name}</div>
        );
    }
});

var Accordion = React.createClass({
    render: function() {

        var these_sections = null;
        new_sections.map(function(section) {
            if(section.language == this.props.language) {
                these_sections = section.sections;
            }
        }.bind(this));
        console.log(these_sections);

        return (
            <div className="menu">
                {these_sections.map(function(section) {
                    return <Section key={section.key}
                                    section={section}
                                    onChildClick={this.props.onChildClick}
                                    activeItem={this.props.activeItem}/>
                }.bind(this))}
            </div>
        );
    }
});

var LanguageItem = React.createClass({
    handleClick: function(){
        this.props.onChildClick(this);
    },

    render(){
        return (
            <div className="language-item" onClick={this.handleClick}>{this.props.name}</div>
        );
    }
});

var LanguageChooser = React.createClass({
    render(){
        var languages = [
            {name: "English", key: "en"},
            {name: "Svenska", key: "sv"},
            {name: "Íslenska", key: "is"}
        ];
        return (
            <div className="language-box">
                <div>Language</div>
                {languages.map(function(item) {
                    return <LanguageItem
                        key={item.key}
                        name={item.name}
                        code={item.key}
                        onChildClick={this.props.onChildClick}
                        type="language" />
                }.bind(this))}
            </div>
        );
    }
});

// Main panel

var MainContainer = React.createClass({

    getInitialState: function() {
        return {
            activeItem: "current",
            language: "en"
        };
    },

    onChildClick: function(object) {
        if(object.props.type == "section_item") {
            this.setState({
                activeItem: object.props.item.key
            });
            $( "#html-content" ).load("content/pages/" + this.state.language + "/" + object.props.item.key + ".html");
        }
        if(object.props.type == "language") {
            this.setState({
                language: object.props.code
            });
            $( "#html-content" ).load("content/pages/" + object.props.code + "/" + this.state.activeItem + ".html");
        }
    },

    render(){
        return (
            <div>
                <div className="row main-container">
                    <div className="col-lg-2 col-md-1 hidden-sm hidden-xs"></div>
                    <div className="col-md-1 col-sm-1 col-xs-1">
                        <Accordion
                            onChildClick={this.onChildClick}
                            activeItem={this.state.activeItem}
                            language={this.state.language}/>
                        <LanguageChooser
                            onChildClick={this.onChildClick}/>
                    </div>
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-2 vertical-divider"></div>
                    <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 content" >
                        <div id="html-content"></div>
                    </div>
                    <div className="col-md-1 hidden-sm hidden-xs"></div>
                </div>
            </div>
        )
    }
});

// App

var App = React.createClass({
    render(){
        return (
            <div className="container-fluid app-container">
                <div><TopPanel /></div>
                <div><MainContainer /></div>
            </div>
        )
    }
});



React.render(<App/>, document.getElementById('app-container'));
$( "#html-content" ).load("content/pages/en/current.html");