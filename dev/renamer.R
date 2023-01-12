for (i in 104:122) {
  df <- read_csv(paste0("/Users/jamiecummins/git/smart-js/trial-materials/stage_", i, ".csv"))
  
  coord_1 <- df %>% mutate(yes_x_coord = 250,
                           no_x_coord = -250)
  coord_2 <- df %>% mutate(yes_x_coord = -250,
                           no_x_coord = 250)
  
  df_new <- coord_1 %>%
    bind_rows(coord_2) %>%
    mutate(q_word = "Is")
  
  write_csv(df_new, paste0("/Users/jamiecummins/git/smart-js/trial-materials/stage_", i, ".csv"))
}
