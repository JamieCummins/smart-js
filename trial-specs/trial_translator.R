csvs <- paste0("/Users/jamiecummins/git/smart-js/trial-specs/en/",
               list.files("/Users/jamiecummins/git/smart-js/trial-specs/en/",
                   pattern = "^stage.*csv$"))

original <- c("is the same as$",
              "the same as$",
              "is opposite to$",
              "opposite to$",
              "is less than$",
              "less than$",
              "is more than$",
              "more than$",
              "comes after$",
              "come after$",
              "comes before$",
              "come before$",
              "is within$",
              "within$",
              "contains$",
              "contain$",
              "\\+$",
              "\\-$",
              "Does$")

translation <- c("is hetzelfde als",
                 "hetzelfde als",
                 "is het tegenovergestelde van",
                 "het tegenovergestelde van",
                 "is minder dan",
                 "minder dan",
                 "is meer dan",
                 "meer dan",
                 "komt na",
                 "na",
                 "komt voor",
                 "voor",
                 "zit in",
                 "in",
                 "bevat",
                 "",
                 "plus",
                 "min",
                 "Bevat")


for (file in csvs) {
  
df <- read_csv(file)
  
  for (i in 1:length(original)) {
    
    df <- df %>%
      mutate(across(everything(),
                    ~str_replace_all(., original[i], translation[i])))
  }
  
df <- df %>% 
  mutate(across(everything(),
                ~coalesce(., ""))) |>
  filter(yes_x_coord != "250")

if ((as.numeric(df$stage[1]) > 81 & as.numeric(df$stage[1]) < 104)) {
  df <- df |>
    mutate(q_word = case_when(str_detect(q_word, "Is") ~ "Zit",
                              TRUE ~ q_word))
}


write_csv(df, 
          paste0("/Users/jamiecummins/git/smart-js/trial-specs/nl/stage_",
                 df$stage[1],
                 ".csv"))

}
