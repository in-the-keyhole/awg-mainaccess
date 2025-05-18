package com.awginc.mainaccess.web.controllers;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.*;
import org.springframework.web.servlet.support.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.*;

@Controller
public class IndexController {

    
    @GetMapping("/")
    public String view(Model model) {
        model.addAttribute("basePath", ServletUriComponentsBuilder.fromCurrentContextPath().path("/").build().toUriString());
        model.addAttribute("version", "1");
        return "index";
    }

    @GetMapping("/404")
    public String handleNotFound(Model model) {
        model.addAttribute("basePath", ServletUriComponentsBuilder.fromCurrentContextPath().path("/").build().toUriString());
        model.addAttribute("version", "1");
        return "index";
    }

}
