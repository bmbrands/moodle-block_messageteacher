YUI.add("moodle-block_messageteacher-form",function(e,t){M.block_messageteacher=M.block_messageteacher||{},M.block_messageteacher.form={overlay:"",init:function(){html='<a id="block_messageteacher_output_header" href="#block_messageteacher"><img src="'+M.util.image_url("t/delete","moodle")+'" /></a>',this.overlay_close=e.Node.create(html),this.overlay=new e.Overlay({headerContent:this.overlay_close,bodyContent:"",id:"block_messageteacher_output",width:"400px",visible:!1,centered:!0,contrain:!0}),this.overlay.render(e.one(document.body)),this.overlay_close.on("click",this.overlay.hide,this.overlay),e.on("key",this.hide_response,this.overlay_close,"down:13",this),this.overlay_close.on("click",this.hide_response,this),e.all(".messageteacher_link").on("click",this.show_form,this)},show_response:function(t){this.overlay.set("bodyContent",e.Node.create(t)),this.overlay.set("align",{node:e.one(".block_messageteacher"),points:[e.WidgetPositionAlign.TL,e.WidgetPositionAlign.RC]}),this.overlay.show()},hide_response:function(){this.overlay.hide()},show_form:function(t){t.preventDefault(),this.xhr=e.io(t.currentTarget.get("href"),{method:"GET",context:this,on:{success:function(t,n){response=e.JSON.parse(n.responseText),this.show_response(response.output),response.script.length>0&&(script=e.one("#messageteacher_dynamic_script"),script&&script.remove(),el=document.createElement("script"),el.id="ilp_dynamic_script",el.textContent=response.script,document.body.appendChild(el)),e.one("#mform1").on("submit",M.block_messageteacher.form.submit_form),e.one("#id_message").focus()},failure:function(e,t){this.show_response(t.responseText)}}})},submit_form:function(t){t.preventDefault();var n=document.getElementById("mform1");this.xhr=e.io(t.target.get("action"),{method:"POST",context:this,form:n,on:{success:function(t,n){response=e.JSON.parse(n.responseText),M.block_messageteacher.form.show_response(response.output)},failure:function(e,t){M.block_messageteacher.form.show_response(t.responseText)}}})}}},"@VERSION@",{requires:["base","io","io-form","node","json","overlay"]});
