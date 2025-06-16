using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

#nullable disable

namespace MM.Entities.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
        INSERT INTO Merchants (Name, Email, Category, CreatedAt)
        VALUES
        ('Steakhouse Prime', 'steakhouseprime711@gmail.com', 'Food', '2025-06-13T03:07:22.431Z'),
        ('Book Haven', 'bookhaven329@professional.biz', 'Retail', '2025-06-13T04:15:20.949Z'),
        ('Beauty Salon Elite', 'beautysalonelit663@yahoo.com', 'Services', '2025-06-13T19:26:02.984Z'),
        ('Home & Garden Center', 'homegardencente814@corporate.co', 'Retail', '2025-06-14T10:39:27.115Z'),
        ('Fashion Forward Boutique', 'fashionforwardb950@gmail.com', 'Retail', '2025-06-15T12:56:38.923Z'),
        ('Jewelry Palace', 'jewelrypalace785@corporate.co', 'Retail', '2025-06-13T04:01:19.132Z'),
        ('Auto Repair Pro', 'autorepairpro742@gmail.com', 'Services', '2025-06-14T10:19:52.462Z'),
        ('Insurance Brokers', 'insurancebroker912@business.com', 'Services', '2025-06-11T17:09:30.914Z'),
        ('Consulting Group', 'consultinggroup762@gmail.com', 'Services', '2025-06-12T06:47:20.627Z'),
        ('Marketing Agency', 'marketingagency350@outlook.com', 'Services', '2025-06-14T14:33:56.475Z'),
        ('Event Planning Services', 'eventplanningse971@professional.biz', 'Services', '2025-06-15T13:18:44.429Z'),
        ('Auto Repair Pro', 'autorepairpro931@company.net', 'Services', '2025-06-12T10:33:43.771Z'),
        ('Fitness First Gym', 'fitnessfirstgym543@business.com', 'Services', '2025-06-11T23:59:24.866Z'),
        ('Legal Advisors LLC', 'legaladvisorsll47@hotmail.com', 'Services', '2025-06-14T02:22:49.281Z'),
        ('Sushi Express', 'sushiexpress152@company.net', 'Food', '2025-06-13T08:34:11.223Z'),
        ('BBQ Masters', 'bbqmasters135@corporate.co', 'Food', '2025-06-16T04:21:14.354Z'),
        ('Music Instruments Hub', 'musicinstrument284@hotmail.com', 'Retail', '2025-06-12T07:14:55.596Z'),
        ('Steakhouse Prime', 'steakhouseprime878@yahoo.com', 'Food', '2025-06-16T07:42:31.448Z'),
        ('Pizza Palace', 'pizzapalace949@enterprise.org', 'Food', '2025-06-15T20:45:03.589Z'),
        ('Toy Kingdom', 'toykingdom249@yahoo.com', 'Retail', '2025-06-15T10:32:30.782Z'),
        ('Furniture World', 'furnitureworld99@enterprise.org', 'Retail', '2025-06-15T06:03:46.587Z'),
        ('Smoothie Bar', 'smoothiebar850@professional.biz', 'Food', '2025-06-14T09:03:56.678Z'),
        ('Seafood Grill', 'seafoodgrill902@corporate.co', 'Food', '2025-06-16T13:14:43.540Z'),
        ('Web Design Studio', 'webdesignstudio87@corporate.co', 'Services', '2025-06-15T12:29:38.633Z'),
        ('Gourmet Bistro', 'gourmetbistro715@outlook.com', 'Food', '2025-06-14T02:45:18.760Z'),
        ('Web Design Studio', 'webdesignstudio65@corporate.co', 'Services', '2025-06-14T10:12:41.382Z'),
        ('Coffee Bean Cafe', 'coffeebeancafe767@enterprise.org', 'Food', '2025-06-14T17:47:45.449Z'),
        ('Pizza Palace', 'pizzapalace603@professional.biz', 'Food', '2025-06-16T12:48:31.179Z'),
        ('Quick Clean Laundry', 'quickcleanlaund743@corporate.co', 'Services', '2025-06-14T14:27:39.009Z'),
        ('Gourmet Bistro', 'gourmetbistro306@outlook.com', 'Food', '2025-06-15T11:40:23.631Z'),
        ('Auto Repair Pro', 'autorepairpro480@gmail.com', 'Services', '2025-06-15T07:11:34.124Z'),
        ('Accounting Solutions', 'accountingsolut31@gmail.com', 'Services', '2025-06-12T13:55:52.511Z'),
        ('Jewelry Palace', 'jewelrypalace733@enterprise.org', 'Retail', '2025-06-13T16:39:06.821Z'),
        ('Fashion Forward Boutique', 'fashionforwardb118@company.net', 'Retail', '2025-06-15T09:17:46.063Z'),
        ('Vegetarian Garden', 'vegetariangarde134@business.com', 'Food', '2025-06-13T16:40:28.129Z'),
        ('Fashion Forward Boutique', 'fashionforwardb536@outlook.com', 'Retail', '2025-06-13T06:59:15.071Z'),
        ('Jewelry Palace', 'jewelrypalace581@gmail.com', 'Retail', '2025-06-11T19:22:59.895Z'),
        ('Accounting Solutions', 'accountingsolut180@hotmail.com', 'Services', '2025-06-12T18:36:31.580Z'),
        ('Electronics Emporium', 'electronicsempo685@professional.biz', 'Retail', '2025-06-12T11:19:14.315Z'),
        ('Beauty Supply Store', 'beautysupplysto596@hotmail.com', 'Retail', '2025-06-14T04:09:01.816Z'),
        ('Steakhouse Prime', 'steakhouseprime104@professional.biz', 'Food', '2025-06-12T18:22:17.091Z'),
        ('Auto Repair Pro', 'autorepairpro402@hotmail.com', 'Services', '2025-06-15T08:04:10.405Z'),
        ('Furniture World', 'furnitureworld746@outlook.com', 'Retail', '2025-06-14T08:07:10.618Z'),
        ('Marketing Agency', 'marketingagency676@professional.biz', 'Services', '2025-06-16T00:41:39.022Z'),
        ('Music Instruments Hub', 'musicinstrument777@business.com', 'Retail', '2025-06-11T20:58:01.756Z'),
        ('Vegetarian Garden', 'vegetariangarde137@yahoo.com', 'Food', '2025-06-14T23:11:27.041Z'),
        ('Book Haven', 'bookhaven423@professional.biz', 'Retail', '2025-06-16T02:12:15.127Z'),
        ('Jewelry Palace', 'jewelrypalace420@company.net', 'Retail', '2025-06-13T05:11:54.885Z'),
        ('Book Haven', 'bookhaven264@hotmail.com', 'Retail', '2025-06-11T19:51:48.315Z'),
        ('Ice Cream Parlor', 'icecreamparlor617@professional.biz', 'Food', '2025-06-14T12:53:08.981Z');
    ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
