@echo off
echo ========================================
echo   ATUALIZANDO SITE BREDI PLANEJADOS
echo ========================================
git add .
git commit -m "Site updated at %date% %time%"
git push origin master
echo ========================================
echo   FEITO! VERCEL VAI ATUALIZAR O SITE...
echo ========================================
pause
