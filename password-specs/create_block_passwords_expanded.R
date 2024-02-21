library(tidyverse)
set.seed(42)


block_num <- c(5:143)
passwords <- sample(1000:9999, length(block_num))

create_function_string <- function(block_num, password) {
 paste0("else if (this.state.stage == '", block_num, "') { 
 this.state.password = '", password, "'
}")
}

password_directory <- function(block_num, password) {
  paste0("The password for Stage ", block_num, " is: ", password)
}


func_strings <- map2(block_num, passwords, .f = create_function_string) %>%
  unlist()
directory <- map2(block_num, passwords, .f = password_directory) %>%
  unlist()

write_lines(func_strings, "/Users/zmeijer/OneDrive - UGent/Documents/PHD/lab.js/SMART/passwords.txt")

write_lines(directory, "/Users/zmeijer/OneDrive - UGent/Documents/PHD/lab.js/SMART/password_directory.txt")
directory
