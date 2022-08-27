package com.webstore.app.adm.controller;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.webstore.app.entity.Bill;
import com.webstore.app.entity.BillDetail;
import com.webstore.app.entity.Category;
import com.webstore.app.entity.Product;
import com.webstore.app.entity.User;
import com.webstore.app.model.CustomUrl;
import com.webstore.app.model.Message;
import com.webstore.app.model.ProductDto;
import com.webstore.app.model.Value;
import com.webstore.app.mysql.repo.BillDetailRepository;
import com.webstore.app.mysql.repo.BillRepository;
import com.webstore.app.mysql.repo.CategoryRepository;
import com.webstore.app.mysql.repo.ProductRepository;
import com.webstore.app.mysql.repo.UserRepository;

@Controller
@RequestMapping("/admin")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 2, // 2MB
		maxFileSize = 1024 * 1024 * 10, // 10MB
		maxRequestSize = 1024 * 1024 * 50) // 50MB
public class AdminViewController {

	private @Autowired UserRepository userRepository;
	private @Autowired CategoryRepository categoryRepository;
	private @Autowired ProductRepository productRepository;
	private @Autowired BillRepository billRepository;
	private @Autowired BillDetailRepository billDetailRepository;

	// đăng nhập admin
	@GetMapping("/login")
	public ModelAndView login() {
		ModelAndView mv = new ModelAndView("/admin/login");
		return mv;
	}

	@PostMapping("/login")
	public String submitLogin(@RequestParam String email, @RequestParam String password, HttpServletRequest request) {
		String url = "";
		User user = userRepository.findAdmin(email, password);
		if (user != null) {
			request.getSession().setAttribute("useradmin", user);
			url = "admin/home";
		} else {
			request.getSession().setAttribute("error", "Email hoặc mật khẩu không đúng.!");
			url = "admin/login";
		}
		return "redirect:/" + url;
	}

	@RequestMapping("/home")
	public ModelAndView home(HttpServletRequest request) {

		HttpSession session = request.getSession();
		if (session.getAttribute("useradmin") == null) {
			return new ModelAndView("redirect:/admin/login");
		}

		ModelAndView mv = new ModelAndView("admin/index");

		return mv;
	}

	@GetMapping("/logout")
	public ModelAndView logout(HttpServletRequest request) {
		request.getSession().removeAttribute("useradmin");
		return new ModelAndView("/admin/login");
	}

	// quản lý loại sản phẩm
	@GetMapping("/manager_category")
	public ModelAndView get() {
		ModelAndView mv = new ModelAndView("admin/manager_category");
		mv.addObject("cates", categoryRepository.findAll());
		return mv;
	}

	// xóa sản phẩm
	@GetMapping("/manager_category/delete/{id}")
	public String get(@PathVariable Long id) {
		categoryRepository.deleteById(id);
		return "redirect:/admin/manager_category";
	}

	// sửa loại sản phẩm
	@GetMapping("/update_category/{id}/{name}")
	public ModelAndView get(@PathVariable Long id, @PathVariable String name) {
		System.out.println(name);
		ModelAndView mv = new ModelAndView("admin/update_category");
		mv.addObject("cate", categoryRepository.findByIdAndName(id, name));
		return mv;
	}

	// thêm loại sản phẩm
	@GetMapping("/category/add")
	public ModelAndView cateegoryAdd() {
		return new ModelAndView("admin/insert_category");
	}

	// xử lý quản lý loại sản phẩm
	@PostMapping("/manager_category")
	public String post(@RequestParam String command, @RequestParam(required = false) Long id,
			@RequestParam String cateName, Model m) {

		String url = "", error = "";
		if (StringUtils.isEmpty(cateName)) {
			error = "Vui lòng nhập tên danh mục!";
			m.addAttribute("error", error);
		}

		try {
			if (error.length() == 0) {
				switch (command) {
				case "insert":
					categoryRepository.save(new Category(cateName));
					url = "/admin/manager_category";
					break;
				case "update":
					categoryRepository.save(new Category(id, cateName));
					url = "/admin/manager_category";
					break;
				}
			} else {
				url = "/admin/insert_category";
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return "redirect:" + url;
	}

	// quản lý sản phẩm
	@RequestMapping("/manager_product")
	public ModelAndView product() {
		System.out.println("test");
		ModelAndView mv = new ModelAndView("admin/manager_product");
		mv.addObject("prods", productRepository.findAll());
		return mv;
	}

	// thêm sản phẩm
	@GetMapping("/product/add")
	public ModelAndView productAdd() {
		ModelAndView mv = new ModelAndView("admin/insert_product");
		mv.addObject("cates", categoryRepository.findAll());
		return mv;
	}

	// sửa sản phẩm
	@GetMapping("/product/update_product/{id}")
	public ModelAndView productUpdate(@PathVariable Long id) {
		ModelAndView mv = new ModelAndView("admin/update_product");
		Product p = productRepository.findById(id).get();
		mv.addObject("cates", categoryRepository.findAll());
		mv.addObject("product", p);

		ProductDto pro_edit = new ProductDto(p.getProductID(), p.getProductName(), p.getProductPrice(),
				p.getProductBuy(), p.getProductDescription(), p.getProductProvider(), p.getProductQuantity(),
				p.getCategoryId(), p.getProductImage(), "update");
		mv.addObject("product_edit", pro_edit);
		mv.addObject("cate", categoryRepository.findById(p.getCategoryId()).get());
		return mv;
	}

	// xử lý sản phẩm
	@ModelAttribute("product_add")
	ProductDto getPro() {
		return new ProductDto();
	}
	@ModelAttribute("product_edit")
	ProductDto getProEdit() {
		return new ProductDto();
	}
	@RequestMapping(value = "/manager_product_add", method = RequestMethod.POST)//no nam chung o day nen no bi them len
	public RedirectView prodUpdate(@ModelAttribute("product_add") ProductDto dto,
			@RequestPart("image_test") MultipartFile file, HttpServletRequest request, RedirectAttributes model)
			throws IOException, ServletException {
		System.out.println(dto);
		String error = "";
		
		//add san pham
		if (dto.getProdName().isEmpty()) { 
			error = "Vui lòng nhập tên sản phẩm!";

			model.addFlashAttribute("error", error);
			return new RedirectView("product/add");
		}
		uploadProductFile(file, request); // dung chung cho edit va themm
		System.out.println("/resources/images/" + file.getOriginalFilename());
		Product p = new Product(dto.getCateId(), dto.getProdName(), "/resources/images/" + file.getOriginalFilename(),
				dto.getPrice(), dto.getDescrip());
		p.setProductBuy(dto.getBuy());
		p.setProductProvider(dto.getProvider());
		p.setProductQuantity(dto.getQuantity());
		//end add san pham
		
		CustomUrl url = new CustomUrl();
		System.out.println("dto.getPrice()" + dto.getPrice());	
				
		productRepository.save(p);
		url.setUrl("/admin/manager_product");
				
		return new RedirectView("manager_product");
	}
	
	
	//update san pham
	@RequestMapping(value = "/manager_product_edit", method = RequestMethod.POST)
	public RedirectView prodUpdate_(@ModelAttribute("product_edit") ProductDto dtoedit,
			@RequestPart("image_test") MultipartFile file, HttpServletRequest request, RedirectAttributes model)
			throws IOException, ServletException {
		
		String error = "";
		
		
		uploadProductFile(file, request); // dung chung cho edit va themm
		
		
		//update san pham
		if (dtoedit.getProdName().isEmpty()) { 
			error = "Vui lòng nhập tên sản phẩm!";

			model.addFlashAttribute("error", error);
			return new RedirectView("product/add");
		}
		
		Product p_edit = new Product(dtoedit.getCateId(), dtoedit.getProdName(), "/resources/images/" + file.getOriginalFilename(),
		dtoedit.getPrice(), dtoedit.getDescrip());
		p_edit.setProductBuy(dtoedit.getBuy());
		p_edit.setProductProvider(dtoedit.getProvider());
		p_edit.setProductQuantity(dtoedit.getQuantity());
		/* System.out.println("dtoedit.getProdId() 2 =" + dtoedit.getProdId()); */
		//end update san pham
		CustomUrl url = new CustomUrl();
		
				p_edit.setProductID(dtoedit.getProdId());
				if(file.getOriginalFilename().isEmpty()) {
					String img_old = productRepository.findById(dtoedit.getProdId()).get().getProductImage();
					p_edit.setProductImage(img_old);
				}
		/* System.out.println("dtoedit.getProdId() 3 =" + dtoedit.getProdId()); */
				productRepository.save(p_edit);
		/* System.out.println("dtoedit.getProdId() 4 =" + dtoedit.getProdId()); */
				url.setUrl("/admin/manager_product");
				
		return new RedirectView("manager_product");
	}

	// xử lý hình ảnh sản phẩm
	@PostMapping("/product/file")
	public @ResponseBody String uploadProductFile(@ModelAttribute MultipartFile hinhanh, HttpServletRequest request) {
		ServletContext servletContext = request.getServletContext();
		String contextPath = servletContext.getRealPath("/");
		String filename = contextPath + "/resources/images/" + hinhanh.getOriginalFilename();

		try {
			hinhanh.transferTo(new File(filename));
		} catch (IllegalStateException e1) {
			System.out.println(e1);
		} catch (IOException e1) {
			System.out.println(e1);
		}

		return hinhanh.getOriginalFilename();
	}

	// xóa sản phẩm
	@GetMapping("/product/delete/{id}")
	public String productDelete(@PathVariable Long id) {
		productRepository.deleteById(id);
		return "redirect:/admin/manager_product";
	}

	// quản lý hóa đơn
	@GetMapping("/manager_bill")
	public ModelAndView bill() {
		ModelAndView mv = new ModelAndView("admin/manager_bill");
		List<Bill> bills = billRepository.findAll();
		bills.forEach(i -> {

			i.setUserEmail(userRepository.findById(i.getUserId()).get().getUserEmail());
		});
		mv.addObject("bills", bills);
		return mv;
	}

	// xóa hóa đơn
	@GetMapping("/bill/delete/{id}")
	public String deletebill(@PathVariable Long id) {
		billRepository.deleteById(id);
		return "redirect:/admin/manager_bill";
	}

	// sửa hóa đơn
	@GetMapping("/bill/update/{id}/{stt}")
	public @ResponseBody Message updatebill(@PathVariable Long id, @PathVariable Short stt) {
		
		Bill bill = billRepository.findById(id).get();
		List<BillDetail> details = billDetailRepository.findByBillId(bill.getId());
		List<Product> products = new LinkedList<>();
		for (BillDetail d : details) {
			Product p = productRepository.findById(d.getProductId()).get();
			if (d.getQuantity() > p.getProductQuantity()) {
				return new Message("eq");
			}
			p.setProductQuantity(p.getProductQuantity() - d.getQuantity());
			products.add(p);
		}

		productRepository.saveAll(products);
		billRepository.updateStatus(id, stt);

		return new Message("ok");
	}

	// quản lý thống kê
	@GetMapping("/chart")
	public ModelAndView chart() {
		List<Value> chartDatas = new LinkedList<>();
		for (Category category : categoryRepository.findAll()) {
			chartDatas.add(new Value(category.getCategoryName(),
					productRepository.findByCategoryId(category.getCategoryID()).size()));
		}
		ModelAndView mv = new ModelAndView("admin/manager_chart");
		mv.addObject("datas", chartDatas);
		return mv;
	}
}
