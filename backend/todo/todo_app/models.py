from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=50)
    details = models.TextField()
    deadline_date = models.DateField()
    
    def __str__(self):
        return self.name   