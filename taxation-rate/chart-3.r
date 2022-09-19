getwd()
setwd("/Users/deegee/Desktop/WorkArea/GitHub/DataViz/taxation-rate")
options(scipen=999) # turn off scientific notation like 1e+06

taxation_data <- read.csv("result.csv")
colnames(taxation_data) <- c('income','taxRate','taxAmount') #Adding headers

# Importing libraries
# install.packages('remotes')
# install.packages("plotly")

# remotes::install_github("clauswilke/ggtext")
library(ggplot2)
library(ggtext)
library(plotly)


# Color definitions
colorSepia <- "#fff1e5"

p <- ggplot(data = taxation_data, 
       aes(x=income/100000, 
           y=income/100000
           ,group = 2
           # ,text = paste("Taxable Income: ",income)
           )
       ) +
  geom_line(aes(y=taxRate,
                text = paste( "Tax Rate: ",taxRate,"%")
                ), colour= "Brown") +
  geom_line(aes(y=taxAmount/100000
                ,text = paste("Tax Amount: ", taxAmount, " INR",
                              "</br></br>",
                              "<b>Taxable Income:</b> ", income, " INR")
                ), colour = "DarkBlue") +
  scale_y_continuous(
    
    # Features of the first axis
    name = "Tax Amount (lakhs) & Tax Rate (%)",
    expand = expansion(mult = c(0, .05)), # This decides start of the y axis
    # Add a second axis and specify its features
    sec.axis = sec_axis(~.*1, name="Tax Rate (%)")
  ) + 
  labs(x="Income (lakhs)" ,
       y="Income (lakhs)",
       title = "Income vs Tax Amount & Tax Rate",
       subtitle = "New tax Regime - Income against tax rate (%)",
       caption = "Source - Github/dheepakg: data-stories/taxation-rate/chart.r"
       
  ) +
  theme(
    plot.title = element_text(face = "bold"),  
    plot.title.position = "panel",
    axis.line = element_line(colour = "black"),
    axis.title.y = element_text(color = "Black"),
    axis.title.y.right = element_text(color = "Brown"),
    plot.background = element_rect(fill = colorSepia),
    panel.background = element_rect(fill = colorSepia),
    panel.grid.minor.x = element_blank(),
    panel.grid.major.x = element_blank(),
    plot.caption = element_markdown(),
    plot.margin = margin(1,1,2,2,"cm"),
    
    
  ) 

ch <- ggplotly(,tooltip = c( "text")) %>% 
  layout(hovermode = "x",height = "400",
         width="600") 



# Storing in a directory
library(htmlwidgets)

# https://github.com/plotly/plotly.py/issues/3337

saveWidget(ch, 
           file="chart_full_h400_w600.json",
           selfcontained = TRUE)
?saveWidget


