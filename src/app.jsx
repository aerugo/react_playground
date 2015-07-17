var React = require("react");

var sections = [
    {
        name: "About",
        items: [
            {name: "Hey", key: "Hey", selected: true},
            {name: "No", key: "No", selected: false},
            {name: "Way", key: "Way", selected: false}
        ]
    },{
        name: "People",
        items: [
            {name: "Bragi Skúlason", key: "Cakewalk", selected: false},
            {name: "George", key: "George", selected: false},
            {name: "Adam", key: "Adam", selected: false}
        ]
    },{
        name: "Projects",
        items: [
            {name: "Pirate raid", key: "Pirate raid", selected: false},
            {name: "Goosehunt", key: "Goosehunt", selected: false}
        ]
    }
];


// App

var App = React.createClass({
    render(){
        return (
            <div></div>
        )
    }
});


// Top panel

var TopPanel = React.createClass({
    render(){
        return (
            <div>
                <h1>Ásgeir R. Helgason Research</h1>
            </div>
        );
    }
});

React.render(<TopPanel/>, document.getElementById('title'));

// Main panel

var MainPanel = React.createClass({
    render(){
        var content;
        switch(this.props.route){
            case "Hey": content = "Hey"; break;
            case "No":  content = "No"; break;
            case "Way": content = "Way"; break;
            default:    content = "Home";
        }
        return <div>{content}</div>
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
        return {
            open: false,
            class: "section"
        }
    },
    render: function() {
        return (
            <div className={this.state.class}>
                <div className="sectionhead" onClick={this.handleClick}>{this.props.section.name}</div>
                <div className="articlewrap">
                    <div className="article">
                        {this.props.section.items.map(function(item) {
                            return <SectionItem key={item.name}
                                                item={item}
                                                onChildClick={this.props.onChildClick}
                                                active={this.props.activeItem===item.name}
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
        this.props.onChildClick(this.props.item.name);
    },
    getInitialState: function(){
        return {
            active: false,
            class: "sectionitem"
        }
    },
    render: function() {
        var className = this.props.active ? "sectionitem active" : "sectionitem";
        return (
            <div className={className} onClick={this.handleClick}>{this.props.item.name}</div>
        );
    }
});

var Accordion = React.createClass({
    getInitialState: function() {
        return {
            openSection: null,
            activeItem: "Hey"
        };
    },

    onChildClick: function(itemName) {
        this.setState({
            activeItem: itemName
        });
    },

    render: function() {
        return (
            <div className="main">
                {this.props.sections.map(function(section) {
                    return <Section key={section.name}
                                    section={section}
                                    onChildClick={this.onChildClick}
                                    activeItem={this.state.activeItem}/>
                }.bind(this))}
            </div>
        );
    }
});

React.render(
    <Accordion sections={sections} />, document.getElementById('accordion')
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});