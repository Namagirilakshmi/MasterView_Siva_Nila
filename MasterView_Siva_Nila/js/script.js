var clickFlag=0,closeBtnFlag=0,clickAndExp=0;
// component starts here
var ItemList=React.createClass({
	getInitialState: function(){
		return{item:{}}
	},
	getData: function(data){//initialize state element
		this.setState({item:data});
	},
	componentWillMount: function(){
		var a=this;//to avoid this conflicts so that the 'this' refers to the parent function not the current function

		// load json data
		$.ajax({
		      datatype: "json",
		      url: "https://dinosaur-facts.firebaseio.com/dinosaurs.json",
		      success: function(data){
		       	a.getData(data);
			 }
		});
		// to detect device size change before click function
		var deviceWidth = window.matchMedia( "(min-width: 767px)" );
		deviceWidth.addListener(function(widthChange){
			if(widthChange.matches){
				if(clickFlag==1){//to check whether the click event is triggered or not
					$('#contents').css({"display":"block"});
					$('#contents').css({"background":"url(images/dino"+(1)+".jpg) 20% 40% no-repeat","background-size":"28% 60%","background-position":"1% 50%"});
				}
			}
			else{
					$('#contents').css({"display":"none"});
				}
		});
	},
	display: function(heading,a,index){
		clickFlag=1;//flag to check click event triggered 

		// appending result in the content div

		$('#contents').html("");
		var title="<h2 class='contentHead'>"+heading+"</h2><table id='descCont'></table>";
		$('#contents').append(title);
		$('#contents').css({"display":"block"});
		$('#contents').css({"background":"url(images/dino"+(index+1)+".jpg) 20% 40% no-repeat","background-size":"28% 60%","background-position":"1% 50%"});
		$.each(a,function(val,key){
			var desc="<tr><td width='60%' align='left' class='descName'>"+val+"</td><td width='40%' class='descVal'>"+key+"</td><td class='clear'></tr>";
			$('#descCont').append(desc);
		});
		
		var deviceWidth = window.matchMedia( "(min-width: 767px)" );
		if(clickFlag==1 && !(deviceWidth.matches)){
			$('#items').css({"display":"none"});

			//used to detect whether we click and expand the window size 

			clickAndExp=1;
			$('#descCont').append("<button id='dynamicBtn' type='button' class='btn btn-success'>close</button>");
			closeBtnFlag=0;

			// adding Click function for Dynamic button

			$("#dynamicBtn").click(function(){
				$('#items').css({"display":"block"});
				$('#contents').css({"display":"none"});
				closeBtnFlag=1;
			});
		}

		// to detect device size change after click function

		deviceWidth.addListener(function(widthChange){
			if(widthChange.matches){
				if(clickAndExp==1){
					$('#items').css({"display":"block"});
					if(closeBtnFlag==1){
						$('#contents').css({"display":"none"});
					}
				}

				// remove the button when the view is not mobile view

				$("#dynamicBtn").remove();
			}
			else{
				$('#contents').css({"display":"none"});
			}
		});
	},
	render: function(){
		var b=this;
		var name=Object.keys(this.state.item);
		var property=Object.values(this.state.item);
		return (
			<ul className="displayItems">{
				name.map(function(values,i){
					return(<li className="dinoName" key={i} onClick={b.display.bind(null,values,property[i],i)}>{values}</li>);
				})
			}
			</ul>
		);
	}
});
// component ends here
ReactDOM.render(<ItemList/>,document.getElementById('items'));