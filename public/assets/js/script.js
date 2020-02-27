$(document).ready(function(){
	var fields = {
		pan: 0,
		driving: 0
	}

	$("#mineBlock").click(function(e) {
		e.preventDefault();
		var data_field_type = {
			authId: "12345",
			data: [{
				type: 'aadhar',
				id: $('.aadhar-id').val(),
				name: $('.aadhar-name').val(),
				phone: $('.aadhar-phone').val(),
				address: $('.aadhar-address').val() 
		}]}
	
		for(var i =0; i<Object.keys(fields).length;i++){
			if(fields[Object.values(fields)[i]] == 1){
				var data_field = {
					type : fields[Object.keys(fields)[i]],
					id: $(`.${fields[Object.keys(fields)[i]]}-id`).val(),
					name: $(`.${fields[Object.keys(fields)[i]]}-name`).val(),
					phone:$(`.${fields[Object.keys(fields)[i]]}-phone`).val(),
					address:$(`.${fields[Object.keys(fields)[i]]}-address`).val()
				};
				data_field_type.data.push(data_field);
			}
		}
		console.log(data_field_type)
		if(data_field_type) {
			console.log(data_field_type)
			$.ajax({
				url : "/api/signup/user",
				type: "POST",
				contentType: 'application/json',
				data: JSON.stringify(data_field_type),
				success: function(data, textStatus, jqXHR)
				{
					//data - response from server
					console.log("jhiijijc")
				},
				error: function (jqXHR, textStatus, errorThrown)
				{
					console.log('casjcio')
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


	$("#addNew").click(function(e){
		e.preventDefault();
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
