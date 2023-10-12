package org.example.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class dottoController {

    private int clickCount = 0;
    @GetMapping("/getmain")
    public String dottoMain(Model model){
        model.addAttribute("click_Count", clickCount);
        return "dotto";
    }

    @PostMapping("/updateCount")
    @ResponseBody
    public String updateCount(@RequestParam int count) {
        clickCount = count;
        return "";

    }

}
