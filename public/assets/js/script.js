$(document).ready(function(){
	$("#addNew").click(function(){
		
		if($("#cardCheck1").prop("checked") == true){
			const aadharHtml = 	`<div id="aadhar"><div class="card-header">
					<h2 class="mb-0">Aadhar Details</h2>
				</div>
				<div class="card-body">
					<div class="row">
						<div id="temptest" class="col-md-6">
							<div class="form-group">
								<label class="form-label">Aadhar number</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter aadhar number">
							</div>

							<div class="form-group">
								<label class="form-label">Aadhar name</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter name as per in aadhar card">
							</div>

							<div class="form-group">
								<label class="form-label">Date of Birth</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter DOB here">
							</div>
						</div>
					</div>
					<button type="button" id="aadharRemover" class="btn btn-outline-danger mt-1 mb-1">remove</button>
				</div></div>`;
			$("#temptest").append(aadharHtml);
			
		}
		if($("#cardCheck2").prop("checked") == true){
			const drivinglicenceHtml = `<div id="DL"><div class="card-header">
					<h2 class="mb-0">Driving licence Details</h2>
				</div>
				<div class="card-body">
					<div class="row">
						<div id="temptest" class="col-md-6">
							<div class="form-group">
								<label class="form-label">DL number</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter licence number">
							</div>
						</div>
					</div>
					<button type="button" id="DLRemover" class="btn btn-outline-danger mt-1 mb-1">remove</button>
				</div></div>`;
			$("#temptest").append(drivinglicenceHtml);
			
		}
		if($("#cardCheck3").prop("checked") == true){
			const passportHtml = `<div id="passport"><div class="card-header">
					<h2 class="mb-0">Passport Details</h2>
				</div>
				<div class="card-body">
					<div class="row">
						<div id="temptest" class="col-md-6">
							<div class="form-group">
								<label class="form-label">Passport ID</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter passport ID">
							</div>

							<div class="form-group">
								<label class="form-label">Name</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter name as per in passport">
							</div>

						
						</div>
					</div>
					<button type="button" id="passportRemover" class="btn btn-outline-danger mt-1 mb-1">remove</button>
				</div></div>`;
			$("#temptest").append(passportHtml);
			
		}
		if($("#cardCheck4").prop("checked") == true){

			const panHtml = `<div id="pan"><div class="card-header">
					<h2 class="mb-0">Pan Details</h2>
				</div>
				<div class="card-body">
					<div class="row">
						<div id="temptest" class="col-md-6">
							<div class="form-group">
								<label class="form-label">Pan number</label>
								<input type="text" class="form-control" name="example-text-input" placeholder="Enter pan number">
							</div>

						</div>
					</div>
					<button type="button" id="panRemover" class="btn btn-outline-danger mt-1 mb-1">remove</button>
				</div></div>`;
			$("#temptest").append(panHtml);
			
		}

		$("#aadharRemover").click(function(){
			console.log("inside aadhar remover");
			$("#aadhar").remove();
		})
		$("#DLRemover").click(function(){
			console.log("inside aadhar remover");
			$("#DL").remove();
		})
		$("#passportRemover").click(function(){
			console.log("inside aadhar remover");
			$("#passport").remove();
		})
		$("#panRemover").click(function(){
			console.log("inside aadhar remover");
			$("#pan").remove();
		})
	})

	
})