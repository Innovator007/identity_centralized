var fields = {
		pan: 0,
		driving: 0
	}
var imageUrl = "";

$(document).ready(function(){
	
	$("#uploadFile").click(function(e) {
		e.preventDefault();
		var fd = new FormData();
		var file = $('#image-field').prop('files')[0];
		fd.append('image',file);

		$.ajax({
			url : "/upload/image",
			type: "POST",
			processData: false,
			contentType: false,
			data: fd,
			success: function(data, textStatus, jqXHR)
			{
				//data - response from server
				
				setimageurl(data);
		
			},
			error: function(jqXHR, textStatus, errorThrown)
			{
				swal({
					title: "Error",
					text:"Error in adding block, please try later.",
					type: "error"
				});
			}
		});
	});

	function setimageurl(imageUrlVal) {
		console.log(imageUrlVal);
		imageUrl = imageUrlVal.imageUrl;

	}

	$("#mineBlock").click(async function(e) {

		
		await e.preventDefault();
		var data_field_type = {
			authId: "12345",
			imageUrl: imageUrl,
			data: [{
				type: 'aadhar',
				id: $('.aadhar-id').val(),
				name: $('.aadhar-name').val(),
				phone: $('.aadhar-phone').val(),
				address: $('.aadhar-address').val() 
		}]}
	
		for(var i =0; i<Object.keys(fields).length;i++){
			if(fields[Object.keys(fields)[i]] === 1){
				var data_field = {
					type : Object.keys(fields)[i],
					id: $(`.${Object.keys(fields)[i]}-id`).val(),
					name: $(`.${Object.keys(fields)[i]}-name`).val(),
					phone:$(`.${Object.keys(fields)[i]}-phone`).val(),
					address:$(`.${Object.keys(fields)[i]}-address`).val()
				};
				data_field_type.data.push(data_field);
			}
		}
		
		if(data_field_type) {
			$.ajax({
				url : "/api/signup/user",
				type: "POST",
				contentType: 'application/json',
				data: JSON.stringify(data_field_type),
				mimeTypes:"multipart/form-data",
				success: function(data, textStatus, jqXHR)
				{
					//data - response from server
					
					swal({
						type:"success",
						title:"Success",
						text: "Block Added successfully!"
					})
					// setTimeout(function() {
					// 	window.location.reload()
					// }, 2000);
				},
				error: function(jqXHR, textStatus, errorThrown)
				{
					swal({
						title: "Error",
						text:"Error in adding block, please try later.",
						type: "error"
					});
				}
			});
		} else {
			swal({
				title: "Error",
				text:"Error in phone and otp",
				type: "error"
			});
		}
		
		// var input_fields = {
		// 	aadharInputs: { selector: '.aadhar', inputs: [] },
		// 	panInputs: { selector: '.pan', inputs: [] },
		// 	drivingInputs: { selector: '.driving', inputs: [] }
		// };

		// for(var i=0;i<Object.keys(input_fields).length;i++) {
		// 	input_fields[Object.keys(input_fields)[i]].inputs=$(input_fields[Object.keys(input_fields)[i]].selector);
		// }
		// for(var i=0;i<Object.keys(input_fields).length;i++) {
		// 	var inputs = input_fields[Object.keys(input_fields)[i]].inputs;
		// 	if(inputs && inputs.length > 0) {
		// 		var data = {
		// 			id: "",
		// 			name: "",
		// 			type: input_fields[Object.keys(input_fields)[i]].selector.substring(1),
		// 			phone: "",
		// 			address: ""
		// 		}
		// 		inputs.forEach(input => {
		// 			if(input.val().length > 0) {
						
		// 			}
		// 		});
		// 		data_structure.append(data);
		// 	}
		// }

		
	});


	$("#addNew").click(async function(e){
		await e.preventDefault();
		var selected = $("#type option:selected").val();
		if(selected == "driving" && fields[selected] === 0){
			const drivinglicenceHtml = `<div class="card" id="DL"><div class="card-header">
					<h2 class="mb-0">Driving licence Details</h2>
				</div>
				<div class="card-body">
					<div class="row">
						<div id="temptest" class="col-md-6">
							<div class="form-group">
								<label class="form-label">Driving License number</label>
								<input required type="text" class="driving driving-id form-control" name="driving-id" placeholder="Enter licence number">
							</div>

							<div class="form-group">
								<label class="form-label">Name</label>
								<input required type="text" class="driving driving-name form-control" name="driving-name" placeholder="Enter name as per in aadhar card">
							</div>

							<div class="form-group">
								<label class="form-label">Phone number</label>
								<input required type="text" class="driving driving-phone form-control" name="driving-phone" placeholder="Enter Phone Number">
							</div>

							<div class="form-group">
								<label class="form-label">Address</label>
								<input required type="text" class="driving driving-address form-control" name="driving-address" placeholder="Enter Your Address">
							</div>
						</div>
					</div>
					<button type="button" id="DLRemover" class="btn btn-outline-danger mt-1 mb-1">remove</button>
				</div></div>`;
			$("#form-div").append(drivinglicenceHtml);
			fields[selected] = 1;
		}


		if(selected == "pan" && fields[selected] === 0){

			const panHtml = `<div class="card" id="pan"><div class="card-header">
					<h2 class="mb-0">Pan Details</h2>
				</div>
				<div class="card-body">
					<div class="row">
						<div id="temptest" class="col-md-6">
							<div class="form-group">
								<label class="form-label">Pan number</label>
								<input type="text" class="pan pan-id form-control" name="pan-id" placeholder="Enter pan number">
							</div>

							<div class="form-group">
								<label class="form-label">Name</label>
								<input type="text" class="pan pan-name form-control" name="pan-name" placeholder="Enter name as per in aadhar card">
							</div>

							<div class="form-group">
								<label class="form-label">Phone number</label>
								<input type="text" class="pan pan-phone form-control" name="pan-number" placeholder="Enter Phone Number">
							</div>

							<div class="form-group">
								<label class="form-label">Address</label>
								<input type="text" class="pan pan-address form-control" name="pan-address" placeholder="Enter Your Address">
							</div>
						</div>
					</div>
					<button type="button" id="panRemover" class="btn btn-outline-danger mt-1 mb-1">remove</button>
				</div></div>`;
			$("#form-div").append(panHtml);
			fields[selected] = 1;
		}
		$("#DLRemover").click(function(){
			$("#DL").remove();
			fields['driving'] = 0;
		})
		$("#panRemover").click(function(){
			$("#pan").remove();
			fields['pan'] = 0;
		})
	})

	
})
