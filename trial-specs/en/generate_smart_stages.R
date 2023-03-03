library(AIG)
library(tidyverse)

# declare items - need minimum of 10 so several irrelevants are also included
items <- c("- 1 -", "- 2 -", "- 3 -", "- irrelevant_remove_0 -", "- irrelevant_remove_1 -", 
          "- irrelevant_remove_2 -", "- irrelevant_remove_3 -",
          "- irrelevant_remove_4 -", "- irrelevant_remove_5 -",
          "- irrelevant_remove_6 -")

# specify relations
compare <- c("contains", "is within")

# specify niterations for creating trials
niters <- 150000

# create null lists for adding values
extracted_raw_premises <- NULL
extracted_raw_questions <- NULL

# create permutations of trials
for(i in 1:niters) {
  
  # resets the run list so it doesn't save a (very) large amount of redundant information
  run <- NULL 
  
  run <-lisy(seed=i, nclues=2, nspread=5, clone = NULL,
                 incidental = 'names', linear = TRUE,
                 antonym = "second", ninfer = 1, direct = 'of',
                 Ndist = 1, dist = "false", distprob = 0.5,
                 itemSet = 'own', items = items, scales = compare)
  
  # extracts information about premises
  extracted_raw_premises <- extracted_raw_premises %>% 
    rbind(as.vector(run[["Question"]]))
  
  # extracts information about question/answer
  extracted_raw_questions <- extracted_raw_questions %>% 
    rbind(as.vector(run[["Answer"]]))
  
}

# extract and process premises for the trials
premises <- extracted_raw_premises %>%
  as.tibble() %>%
  rename(full_question = 1) %>%
  mutate(full_question = as.character(full_question),
         index = c(1:nrow(.))) %>%
  separate(full_question, c("premise_1", "premise_2"), sep = ",") %>%
  
  # remove extraneous question part
  mutate(premise_2 = str_extract(premise_2, "[^.]+")) %>%
  
  mutate_at(vars(contains("premise")), funs(str_sub(., start = 4))) %>%
  separate(premise_1, c("stim_1_id", "relation_1", "stim_2_id"), sep =  " - ") %>%
  separate(premise_2, c("stim_3_id", "relation_2", "stim_4_id"), sep =  " - ") %>%
  # separate(premise_3, c("stim_5_id", "relation_3", "stim_6_id"), sep =  " - ") %>%
  mutate_all(funs(str_remove(., " -"))) %>%
  
  # get rid of irrelevant trials
  filter_at(vars(contains("stim_")), all_vars(!str_detect(., pattern = "irrelevant"))) %>%
  filter(stim_1_id == "1",
         stim_2_id == "2")
  
# extract and process answers for the trials 
answer <- extracted_raw_questions %>%
  as.tibble() %>%
  rename(full_answer = 1) %>%
  mutate(full_answer = as.character(full_answer),
         index = c(1:nrow(.))) %>%
  
  # remove extraneous question part
  mutate(full_answer = str_extract(full_answer, "[^.]+"),
         full_answer = str_sub(full_answer, start = 4)) %>%
  separate(full_answer, c("answer_stim_1", "answer_rel", "answer_stim_2"), sep =  " - ") %>%
  mutate_all(funs(str_remove(., " -"))) %>%
  filter(index %in% premises$index)

# declare types of relations
relations <- c("contains ", "is within ")

# create empty df for adding values
question_permutations <- NULL

for (i in 1:nrow(answer)) {
  
  trial_slice <- answer %>%
    slice(rep(i, each = 4)) 
  
  original_relation <- trial_slice %>%
    distinct(answer_rel) %>%
    as.vector()
  
  first_stim <- trial_slice %>%
    distinct(answer_stim_1) %>%
    pull() %>%
    as.vector()
  
  second_stim <- trial_slice %>%
    distinct(answer_stim_2) %>%
    pull() %>%
    as.vector()
  
  new_relation <- relations[!relations %in% original_relation]
  
  question_permutations <- trial_slice %>%
    mutate(new_index = c(1:4),
           answer_rel = case_when(new_index > 2 ~ new_relation, 
                                  TRUE ~ answer_rel),
           answer_stim_1 = case_when(new_index %% 2 == 1 ~ first_stim,
                                     TRUE ~ second_stim),
           answer_stim_2 = case_when(new_index %% 2 == 1 ~ second_stim,
                                     TRUE ~ first_stim),
           answer_rel = str_remove(answer_rel, "is")) %>%
    unite(index, c("index", "new_index")) %>%
    mutate(correct_response = c("yes", "no", "no", "yes")) %>%
    select(q_stim_1_id = answer_stim_1,
           q_rel = answer_rel,
           q_stim_2_id = answer_stim_2,
           correct_response,
           index) %>%
    bind_rows(question_permutations)
    
}

trials <- premises %>%
  
  # create 4 copies of each trial type
  slice(rep(1:n(), each = 4)) %>%
  mutate(index = paste0(index, "_", rep(c(1:4), nrow(.) / 4))) %>%
  left_join(question_permutations) 


doubled_up_trials <- trials %>%
  bind_rows(trials) %>%
  select(-index, -stim_1_id, -stim_2_id) %>%
  mutate(yes_x_coord = rep(c(250, -250), each = nrow(.) / 2),
         no_x_coord = rep(c(-250, 250), each = nrow(.) / 2),
         stage = 82) %>%
  distinct(.keep_all = TRUE)


write_csv(doubled_up_trials, "stage_55.csv")
  
