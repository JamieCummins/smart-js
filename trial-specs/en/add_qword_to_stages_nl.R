list <- list()

for i in 5:103 {
  
  df <- read_csv("stage_", i, .csv)
  
  if ("q_word" %in% colnames(df) {
    df <- df
  } else {
    df <- df %>%
      mutate(q_word = case_when(stage > 55 & stage < 82 ~ "Komt",
                                stage < 56 ~ "Is"))
    
    list <<- df
  }
    
  
  df %>%
  
}


