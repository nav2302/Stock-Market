package com.stockMarket.ExcelService.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.stockMarket.ExcelService.model.Company;
import com.stockMarket.ExcelService.model.CompanyStockPrice;


public class ExcelHelper {
	public static String TYPE = "application/octet-stream";
	static String[] HEADERs = { "Id", "Title", "Description", "Published" };
	static String SHEET = "Stock Data";

	public static boolean hasExcelFormat(MultipartFile file) {
		System.out.println(file.getContentType());

		if (!TYPE.equals(file.getContentType())) {
			return false;
		}

		return true;
	}

	public static Map<String, List<CompanyStockPrice>> excelToTutorials(InputStream is, Company company) {
		try {
			Workbook workbook = new XSSFWorkbook(is);
			Sheet sheet = workbook.getSheet(SHEET);
			Iterator<Row> rows = sheet.iterator();
			
			Map<String, List<CompanyStockPrice>> map=new HashMap<>();
			
			List<CompanyStockPrice> companyStockPrices = new ArrayList<CompanyStockPrice>();

			Row firstRow = sheet.getRow(0);
			if (firstRow.getCell(0).toString().equalsIgnoreCase("Date")
					&& firstRow.getCell(1).toString().equalsIgnoreCase("Day Open")
					&& firstRow.getCell(2).toString().equalsIgnoreCase("Day Close")
					&& firstRow.getCell(3).toString().equalsIgnoreCase("Day High")
					&& firstRow.getCell(4).toString().equalsIgnoreCase("Day Low")
					&& firstRow.getCell(5).toString().equalsIgnoreCase("Volume Traded")) {

				int rowNumber = 0;
					while (rows.hasNext()) {
					Row currentRow = rows.next();

					if (rowNumber == 0) {
						rowNumber++;
						continue;
					}

					Iterator<Cell> cellsInRow = currentRow.iterator();

					CompanyStockPrice companyStockPrice = new CompanyStockPrice();
					companyStockPrice.setCompany(company);

					int cellIdx = 0;
					while (cellsInRow.hasNext()) {
						Cell currentCell = cellsInRow.next();

						switch (cellIdx) {
						case 0:
							String value = currentCell.getStringCellValue();
							if (!value.isEmpty())
								try {
									companyStockPrice.setDate(value);
								}
							catch(Exception e) {
								map.put("Invalid Date Provided", companyStockPrices);
								return map;
							}
							else {
								map.put("Date Column is Empty", companyStockPrices);
								return map;
							}
							break;

						case 1:
							companyStockPrice.setDayOpen(Double.parseDouble(currentCell.getStringCellValue()));
							break;

						case 2:
							companyStockPrice.setDayClose(Double.parseDouble(currentCell.getStringCellValue()));
							break;

						case 3:
							companyStockPrice.setDayHigh(Double.parseDouble(currentCell.getStringCellValue()));
							break;

						case 4:
							companyStockPrice.setDayLow(Double.parseDouble(currentCell.getStringCellValue()));
							break;

						case 5:
							companyStockPrice.setVolumeTraded(Double.parseDouble(currentCell.getStringCellValue()));
							break;

						default:
							break;
						}

						cellIdx++;
					}

					companyStockPrices.add(companyStockPrice);
				}
			}
			else {
				map.put("Invalid Fields", companyStockPrices);
				workbook.close();
				return map;
			}

			workbook.close();
			map.put("No Error", companyStockPrices);
			return map;
		} catch (IOException e) {
			throw new RuntimeException("Failed to parse Excel file: " + e.getMessage());
		}
	}
}