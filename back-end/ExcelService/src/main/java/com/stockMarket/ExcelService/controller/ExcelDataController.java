package com.stockMarket.ExcelService.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stockMarket.ExcelService.constants.ResponseCode;
import com.stockMarket.ExcelService.model.CompanyStockPrice;
import com.stockMarket.ExcelService.repository.CompanyRepository;
import com.stockMarket.ExcelService.response.serverResponse;
import com.stockMarket.ExcelService.service.ExcelFileService;
import com.stockMarket.ExcelService.util.ExcelHelper;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/data")
public class ExcelDataController {
	
	@Autowired CompanyRepository companyRepository;
	
	@Autowired
	private ExcelFileService fileService;
	
	@GetMapping("/excelData")
	public ResponseEntity<List<CompanyStockPrice>> getAllStockPrices(@RequestParam("id") Long companyId) {
	    try {
	      List<CompanyStockPrice> stockPrices = fileService.getAllStockPrices(companyRepository.findById(companyId).orElse(null));

	      if (stockPrices.isEmpty()) {
	    	  System.out.println("Stock is Empty Baby!!!");
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	      }

	      return new ResponseEntity<>(stockPrices, HttpStatus.OK);
	    } catch (Exception e) {
	    	e.printStackTrace();
	      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	  }

	@PostMapping("/uploadDataInExcel")
	public ResponseEntity<serverResponse> uploadExcelFile(@RequestParam("file") MultipartFile file,
			@RequestParam("id") String id) {
		
		serverResponse resp = new serverResponse();
		Long companyId = Long.parseLong(id);
		if (ExcelHelper.hasExcelFormat(file)) {
			try {
				String response = fileService.save(file, companyRepository.findById(companyId).orElse(null));
				if(response.contains("Invalid")) {
					resp.setStatus("600");
					resp.setMessage(response);
				}
				else {
					resp.setMessage("UPLOAD SUCCESSFUL");
					resp.setStatus(ResponseCode.SUCCESS_CODE);
				}
			} catch (Exception e) {
				e.printStackTrace();
				resp.setMessage(e.getMessage());
				resp.setStatus(ResponseCode.FAILURE_CODE);
			}
		}
		else {
			resp.setStatus(ResponseCode.BAD_REQUEST_CODE);
			resp.setMessage("UPLOAD EXCEL FILE ONLY");
		}
		return new ResponseEntity<serverResponse>(resp, HttpStatus.ACCEPTED);
	}
}
