(function(b,c){var a={};a.get=function(d){return d};b.use("io-base",function(d){a.get=d.cached(function(i,j){var e=this;var g=themeDisplay.getPathContext()+"/language/"+themeDisplay.getLanguageId()+"/"+i+"/";if(j){if(typeof j=="string"){g+=j}else{if(c.Util.isArray(j)){g+=j.join("/")}}}var f=g;var h=c.authToken;if(h){f=c.Util.addParams("p_auth="+h,g)}d.io(f,{on:{complete:function(k,l){value=l.responseText}},sync:true,type:"GET"});return value})});c.Language=a})(AUI(),Liferay);