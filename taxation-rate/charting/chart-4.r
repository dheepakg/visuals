seq <- 1:10
name <- c(paste0("company",1:10))
value <- c(250, 125, 50, 40, 40, 30, 20, 20, 10, 10)
d <- data.frame(seq, name, value)

require(ggplot2)

ggplot(data=d,
       aes(x = seq, y = value,
           group =1,
           text = paste('name: ', name)
      ))+
  geom_line()+
  geom_point()
  
ggplotly(,tooltip = c("x",'text'))
